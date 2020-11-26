import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j'
import { REQUEST } from '@nestjs/core';
import { Sale } from './entity/sales.entity';
import { Request } from 'express';
import { CreateSale } from './dto/sales.dto';
import { ProductsService } from 'src/products/products.service';
import { ClientsService } from 'src/clients/clients.service';
import { StaffService } from 'src/staff/staff.service';

@Injectable()
export class SalesService {
    constructor(
        private readonly serviceProduct: ProductsService,
        private readonly serviceClient: ClientsService,
        private readonly serviceStaff: StaffService,
        @Inject(REQUEST)
        private readonly request: Request,
        private readonly neo4jService: Neo4jService,

    ) { }

    async findAll(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (s:Sale)
            RETURN  s, 
                    s.type_payment as type_payment, 
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale,  
                    s.quantity_sale as quantity_sale,
                    s.date as date
        `).then(res => {
            const sales = res.records.map(row => {
                return new Sale(
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale'),
                    row.get('date')

                )
            })
            return sales.length > 0 ? sales.map(a => a)
                : new NotFoundException('sales not found')
        })
    }

    async findById(idSale: number): Promise<any> {
        return await this.neo4jService.read(`
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
            const sale = res.records.map(row => {
                return new Sale(
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale'),
                    row.get('date')
                )
            })
            return sale.length > 0 ? sale.map(a => a)
                : new NotFoundException('sale not found')
        })

    }

    async remove(idSale: number) {
        if (!((await this.findById(idSale)).length > 0))
            throw new NotFoundException('sale not found')

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

    async create(sale: CreateSale, idProduct: number, idClient: number, idStaff: number): Promise<any> {
        if (!((await this.serviceProduct.findById(idProduct)).length > 0))
            throw new NotFoundException('product not found')

        if (!((await this.serviceProduct.findDisponibleById(idProduct)).length > 0))
            throw new NotFoundException('product not disponible')

        if (!((await this.serviceClient.findById(idClient)).length > 0))
            throw new NotFoundException('client not found')

        if (!((await this.serviceStaff.findById(idStaff)).length > 0))
            throw new NotFoundException('staff not found')

        return await this.neo4jService.write(`
            MATCH (p:Product) WHERE id(p) = toInteger($id_product)
                SET p.quantity_disponible = p.quantity_disponible - $sale_proper.quantity_sale

            WITH p
            MATCH (st:Staff) WHERE id(st) = toInteger($id_staff)
            MATCH (st)-[works:WORKS_ON]->(:Stoke)
                SET works.sum_quantity_sale = works.sum_quantity_sale + $sale_proper.quantity_sale,
                    works.sales_count = works.sales_count + 1

            WITH p, st
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
            MERGE (c)-[hass:HAS_SALE_PRODUCT]->(p)
                ON MATCH SET hass.sales_count = hass.sales_count + 1
                ON CREATE SET hass.sales_count = 1
            
            WITH c, p, st
            CREATE (s:Sale {type_payment: $sale_proper.type_payment,
                            quantity_parcels: $sale_proper.quantity_parcels,
                            total_sale: $sale_proper.quantity_sale * p.price,
                            quantity_sale: $sale_proper.quantity_sale,
                            date: $sale_proper.date})-[:FROM_CLIENT]->(c), 
                    (s)-[:FROM_PRODUCT]->(p)
            
            WITH st, p, c, s
            MERGE (st)-[hasds:HAS_DONE_SALE]->(s)
                SET hasds.date_sale = $sale_proper.date, 
                    hasds.client_id = toInteger($id_client)
            
            WITH c, p, s
            
            MATCH (S:Stoke)-[hasp:HAS_PRODUCT]->(p)
                SET hasp.quantity_disponible = p.quantity_disponible,
                    hasp.sum_quantity_sale = hasp.sum_quantity_sale + s.quantity_sale,
                    hasp.sales_count = hasp.sales_count + 1
            WITH c, p, s, S

            CREATE (s)-[done:DONE_ON]->(S)
                SET done.date = s.date
            WITH c, p, s, S

            MERGE (S)-[hasc:HAS_CLIENT]->(c)
                ON MATCH SET hasc.sum_total_sale = hasc.sum_total_sale + s.total_sale
                ON CREATE SET hasc.sum_total_sale = s.total_sale
            
            WITH s
            RETURN  s, 
                    s.type_payment as type_payment,
                    s.quantity_parcels as quantity_parcels,
                    s.total_sale as total_sale,
                    s.quantity_sale as quantity_sale,
                    s.date as date
        `, {
            sale_proper: sale,
            id_product: idProduct,
            id_client: idClient,
            id_staff: idStaff
        }).then(res => {
            const row = res.records[0]
            return res.records.length > 0 ?
                new Sale(
                    row.get('s'),
                    row.get('type_payment'),
                    row.get('quantity_parcels'),
                    row.get('total_sale'),
                    row.get('quantity_sale'),
                    row.get('date')

                ) : new BadRequestException('error on create sale')
        });
    }

}
