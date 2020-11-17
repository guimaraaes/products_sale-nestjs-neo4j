import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j'
import { REQUEST } from '@nestjs/core';
import { Sale } from './entity/sale.entity';
import { Request } from 'express';
import { CreateSale } from './dto/sale.dto';
import { ProductsService } from 'src/products/products.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class SalesService {
    constructor(
        private readonly serviceProduct: ProductsService,
        private readonly serviceClient: ClientsService,
        @Inject(REQUEST)
        private readonly request:Request,
        private readonly neo4jService: Neo4jService,
        
    ) {}

    async findAll(): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (s:Sale)
            RETURN  s, 
                    s.type_payment as type_payment, 
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale,  
                    s.quantity_sale as quantity_sale,
                    s.date as date
        `).then(res => {
            const products = res.records.map(row => {
                return new Sale(
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale'),
                    row.get('date')
                    
                )
            })
            return products.map(a => a)
        })
    }

    async findById(idSale: number): Promise<Sale[]>{
        const found = await this.neo4jService.read(`
            MATCH (s:Sale) WHERE id(s)=toInteger($id_sale)
            RETURN  s, 
                    s.type_payment as type_payment, 
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale, 
                    s.quantity_sale as quantity_sale,
                    s.date as date
        `, { 
            id_sale: idSale
        }).then(res => {
            const clients = res.records.map(row => {
                return new Sale(
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale'),
                    row.get('date')
                )
            })
            return clients.map(a => a)
        })
        if (found.length == 0){
            throw new NotFoundException('Sale not found')
        }
        return found
    }

    async remove(idSale: number){
        const found = (await this.findById(idSale)).length
        if (typeof(found) != 'number')
            return found
        await this.neo4jService.write(`
            MATCH (s:Sale)-[:FROM_PRODUCT]->(p:Product),
                    (s:Sale)-[:FROM_CLIENT]->(c:Client) WHERE id(s) = toInteger($id_sale)
                SET p.quantity_disponible = p.quantity_disponible + s.quantity_sale

            WITH s, c, p 

            MATCH (s)-[:DONE_ON]->(S:Stoke)-[hasc:HAS_CLIENT]->(c)-[hass:HAS_SALE_PRODUCT]->(p) WHERE id(S) = 19
                SET hasc.sum_total_sale = hasc.sum_total_sale - s.total_sale, 
                    hass.sales_count = hass.sales_count - 1

            WITH s, c, p 

            MATCH (s)-[:DONE_ON]->(S:Stoke)-[hasp:HAS_PRODUCT]->(p) WHERE id(S) = 19
                SET hasp.quantity_disponible = hasp.quantity_disponible + s.quantity_sale,
                    hasp.sum_quantity_sale = hasp.sum_quantity_sale - s.quantity_sale,
                    hasp.sales_count = hasp.sales_count - 1

            WITH s, c, p

            DETACH DELETE s
        `, {
            id_sale: idSale
        })
    }

    async create(sale:CreateSale, idProduct: number, idClient: number): Promise<any>{
        const foundProduct = (await this.serviceProduct.findById(idProduct)).length
        if (typeof(foundProduct) != 'number')
            return foundProduct

        const foundProductDisponible = (await this.serviceProduct.findDisponibleById(idProduct)).length
        if (typeof(foundProductDisponible) != 'number')
            return foundProductDisponible
        const foundClient = (await this.serviceClient.findById(idClient)).length
        if (typeof(foundClient) != 'number')
            return foundClient
        
        return await this.neo4jService.write(`
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
            MATCH (p:Product) WHERE id(p) = toInteger($id_product)
                SET p.quantity_disponible = p.quantity_disponible - $sale_proper.quantity_sale

            MERGE (c)-[hass:HAS_SALE_PRODUCT]->(p)
                ON MATCH SET hass.sales_count = hass.sales_count + 1
                ON CREATE SET hass.sales_count = 1
            
            WITH c, p

            CREATE (s:Sale {type_payment: $sale_proper.type_payment,
                            quantity_parcels: $sale_proper.quantity_parcels,
                            total_sale: $sale_proper.quantity_sale * p.price,
                            quantity_sale: $sale_proper.quantity_sale,
                            date: $sale_proper.date})-[:FROM_CLIENT]->(c), 
                    (s)-[:FROM_PRODUCT]->(p)
            
            WITH c, p, s

            MATCH (S:Stoke) WHERE id(S) = 19
            CREATE (s)-[done:DONE_ON]->(S)
                SET done.date = s.date
            WITH c, p, s, S
            //MERGE (S)-[hasp:HAS_PRODUCT]->(p)
            MATCH (S)-[hasp:HAS_PRODUCT]->(p)
                SET hasp.quantity_disponible = p.quantity_disponible,
                    hasp.sum_quantity_sale = hasp.sum_quantity_sale + s.quantity_sale,
                    hasp.sales_count = hasp.sales_count + 1
                
            WITH S, c, p, s 

            MERGE (S)-[hasc:HAS_CLIENT]->(c)
                ON MATCH SET hasc.sum_total_sale = hasc.sum_total_sale + s.total_sale
                ON CREATE SET hasc.sum_total_sale = s.total_sale
                            
            RETURN  s, 
                    s.type_payment as type_payment,
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale,
                    s.quantity_sale as quantity_sale,
                    s.date as date
        `, {
            sale_proper: sale, id_product: idProduct, id_client: idClient
        })
        .then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('s'),
                // row.get('c'),
                // row.get('p'),
                row.get('type_payment'),
                row.get('quantity_parcels'),
                row.get('total_sale'),
                row.get('quantity_sale'),
                row.get('date')

            )
        });
    }
    
}
