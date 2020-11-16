import { Injectable, Inject } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j'
import { REQUEST } from '@nestjs/core';
import { Sale } from './entity/sale.entity';
import { Request } from 'express';
import { SaleDTO } from './dto/sale.dto';

@Injectable()
export class SalesService {
    constructor(
        @Inject(REQUEST)
        private readonly request:Request,
        private readonly neo4jService: Neo4jService
    ) {}

    async findAll(): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (s:Sale)
            RETURN s, s.type_payment as type_payment, 
                    s.quantity_parcels as quantity_parcels, 
                    s.total_sale as total_sale, 
                    s.quantity_sale as quantity_sale
        `).then(res => {
            const products = res.records.map(row => {
                return new Sale(
                    row.get('s'),
                    null,
                    null,
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale')
                    
                )
            })
            return products.map(a => a)
        })
    }

    async findById(idSale: number){
        return await this.neo4jService.read(`
            MATCH (s:Sale)
            WHERE id(s)=toInteger($id_sale)
            RETURN s, s.type_payment as type_payment, 
                    s.quantity_parcels as quantity_parcels, 
                    s.total_sale as total_sale, 
                    s.quantity_sale as quantity_sale
        `, { 
            id_sale: idSale
        }).then(res => {
            const clients = res.records.map(row => {
                return new Sale(
                    null,
                    null,
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale')
                )
            })
            return clients.map(a => a)
        })
    }

    async remove(idSale: number){
        await this.neo4jService.write(`
            MATCH (s:Sale)-[:FROM_PRODUCT]->(p:Product),
                    (s:Sale)-[:FROM_CLIENT]->(c:Client) WHERE id(s) = toInteger($id_sale)
                SET p.quantity_disponible = p.quantity_disponible + s.quantity_sale

            WITH s, c, p 

            MATCH (s)-[:DONE_ON]->(S:Stoke)-[hasC:HAS_CLIENT]->(c)-[hass:HAS_SALE_PRODUCT]->(p) WHERE id(S) = 21
                SET hasC.quantity_sale = hasC.quantity_sale - s.total_sale, 
                    hass.quantity = hass.quantity - s.quantity_sale

            WITH s, c, p 

            MATCH (s)-[:DONE_ON]->(S:Stoke)-[hasp:HAS_PRODUCT]->(p) WHERE id(S) = 21
                SET hasp.quantity_disponible = hasp.quantity_disponible + s.quantity_sale,
                    hasp.quantity_sale = hasp.quantity_sale - s.quantity_sale,
                    hasp.sales_count = hasp.sales_count - 1

            WITH s, c, p

            DETACH DELETE s
        `, {
            id_sale: idSale
        })
    }

    async create(sale:SaleDTO, idProduct: number, idClient: number): Promise<any>{
        return await this.neo4jService.write(`
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
            MATCH (p:Product) WHERE id(p) = toInteger($id_product)
                SET p.quantity_disponible = p.quantity_disponible - $sale_proper.quantity_sale

            MERGE (c)-[hass:HAS_SALE_PRODUCT]->(p)
                ON MATCH SET hass.quantity = hass.quantity + $sale_proper.quantity_sale
                ON CREATE SET hass.quantity = $sale_proper.quantity_sale
            
            WITH c, p

            CREATE (s:Sale 
                        {type_payment: $sale_proper.type_payment,
                        quantity_parcels: $sale_proper.quantity_parcels,
                        total_sale: $sale_proper.total_sale,
                        quantity_sale: $sale_proper.quantity_sale})
                -[:FROM_CLIENT]->(c), 
                (s)-[:FROM_PRODUCT]->(p)
            
            WITH c, p, s

            MATCH (S:Stoke) WHERE id(S) = 32
            CREATE (s)-[:DONE_ON]->(S)
            MERGE (S)-[hasp:HAS_PRODUCT]->(p)
                SET hasp.quantity_disponible = p.quantity_disponible,
                    hasp.quantity_sale = hasp.quantity_sale + s.quantity_sale,
                    hasp.sales_count = hasp.sales_count + 1
                
            WITH S, c, p, s
            MERGE (S)-[hasc:HAS_CLIENT]->(c)
                ON MATCH SET hasc.quantity_sale = hasc.quantity_sale + s.total_sale
                ON CREATE SET hasc.quantity_sale = s.total_sale
                            
            RETURN s, c, p, s.type_payment as type_payment,
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale,
                    s.quantity_sale as quantity_sale
        `, {
            sale_proper: sale, id_product: idProduct, id_client: idClient
            
        })
        .then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('s'),
                row.get('c'),
                row.get('p'),
                row.get('type_payment'),
                row.get('quantity_parcels'),
                row.get('total_sale'),
                row.get('quantity_sale')
            )
        });
    }


    

    
}
