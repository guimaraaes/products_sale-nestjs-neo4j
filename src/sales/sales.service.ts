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
            MATCH (n:Sale)
            RETURN n, n.type_payment as type_payment, 
                    n.quantity_parcels as quantity_parcels, 
                    n.total_sale as total_sale, 
                    n.quantity_sale as quantity_sale
        `).then(res => {
            const products = res.records.map(row => {
                return new Sale(
                    row.get('n'),
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
    
    findDisponible(){
        return 'ainda em teste';
    }

    findByTarget(){
        return 'ainda em teste';
    }

    async findById(idSale: number){
        return await this.neo4jService.read(`
            MATCH (n:Sale)
            WHERE id(n)=toInteger($id_sale)
            RETURN n, n.type_payment as type_payment, 
                    n.quantity_parcels as quantity_parcels, 
                    n.total_sale as total_sale, 
                    n.quantity_sale as quantity_sale
        `, { 
            id_sale: idSale
        }).then(res => {
            const clients = res.records.map(row => {
                return new Sale(
                    null,
                    null,
                    row.get('n'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale')
                )
            })
            return clients.map(a => a.toJson())
        })
 
    }
    //n2.total_sale
    //[:HAS_SALE_PRODUCT {quantity: $sale.proper.total_sale}]
    async create(sale:SaleDTO, idProduct: number, idClient: number): Promise<any>{
        return await this.neo4jService.write(`
            MATCH (c:Client)
            WHERE id(c) = toInteger($id_client)
            MERGE (c)-[rel:HAS_SALE_PRODUCT]->(p:Product)
            SET rel.quantity = rel.quantity + $sale_proper.total_sale
            WITH c
            CREATE (n:Sale 
                        {total_sale: $sale_proper.total_sale, type_payment: $sale_proper.type_payment, 
                        quantity_parcels: $sale_proper.quantity_parcels})
                    -[:FROM_PRODUCT]->(n2:Product), (n)-[:FROM_CLIENT]->(c)
            WHERE id(n2) = toInteger($id_product)
            SET n2.quantity_disponible = n2.quantity_disponible - toInteger($sale_proper.quantity_sale)
            RETURN n, n2, n.total_sale as total_sale,
                    n.type_payment as type_payment,
                    n.quantity_parcels as quantity_parcels
        `, {
            sale_proper: sale, id_product: idProduct, id_client: idClient
            
        })
        .then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('n'),
                null,
                row.get('n2'),
                row.get('type_payment'),
                row.get('quantity_parcels'),
                row.get('total_sale'),
                row.get('quantity_sale')
            )
        });
    }
// {total_sale: $p.total_sale, type_payment: $p.type_payment, 
// quantity_parcels: $p.quantity_parcels}
    async edit(id: number, sale:SaleDTO){
        return await this.neo4jService.write(`
            MERGE (n:Sale)
            WHERE id(n)=toInteger($_p.id)
            RETURN n, n.total_sale as total_sale,
                    n.type_payment as type_payment,
                    n.quantity_parcels as quantity_parcels
        `, {
            _p: {id},
            p: {sale_proper: sale}
        }).then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('n'),
                null,
                null,
                row.get('type_payment'),
                row.get('quantity_parcels'),
                row.get('total_sale'),
                row.get('quantity_sale')
            )
        });
    }

    remove(){
        return 'ainda em teste';
    }

    
}
