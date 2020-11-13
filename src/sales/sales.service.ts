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
            RETURN n, n.total_sale as total_sale, 
            n.type_payment as type_payment, 
            n.quantity_parcels as quantity_parcels
        `).then(res => {
            const products = res.records.map(row => {
                return new Sale(
                    row.get('n'),
                    row.get('total_sale'),
                    row.get('type_payment'),
                    row.get('quantity_parcels')
                )
            })
            return products.map(a => a.toJson())
        })
    }
    findDisponible(){
        return 'ainda em teste';
    }

    findByTarget(){
        return 'ainda em teste';
    }

    async findById(id: number){
        return await this.neo4jService.read(`
            MATCH (n:Sale)
            WHERE id(n)=toInteger($p.id)
            RETURN n, n.total_sale as total_sale,
                    n.type_payment as type_payment,
                    n.quantity_parcels as quantity_parcels
        `, { 
            p: {id}
        }).then(res => {
            const clients = res.records.map(row => {
                return new Sale(
                    row.get('n'),
                    row.get('total_sale'),
                    row.get('type_payment'), 
                    row.get('quantity_parcels')
                )
            })
            return clients.map(a => a.toJson())
        })
 
    }

    async create(sale:SaleDTO): Promise<any>{
        return await this.neo4jService.write(`
            MERGE (n:Sale 
                    {total_sale: $p.total_sale, type_payment: $p.type_payment, 
                    quantity_parcels: $p.quantity_parcels})
            RETURN n, n.total_sale as total_sale,
                    n.type_payment as type_payment,
                    n.quantity_parcels as quantity_parcels
        `, {
            p: sale
        })
        .then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('n'),
                row.get('total_sale'),
                row.get('type_payment'),
                row.get('quantity_parcels')
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
            p: sale
        }).then(res => {
            const row = res.records[0]
            return new Sale(
                row.get('n'),
                row.get('total_sale'),
                row.get('type_payment'),
                row.get('quantity_parcels')
            )
        });
    }

    remove(){
        return 'ainda em teste';
    }

    
}
