import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Neo4jService } from 'nest-neo4j';
import { Request } from 'express';
import { Product } from './entity/product.entity';
import { UpdateProduct, CreateProduct } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(REQUEST) 
        private readonly request:Request,
        private readonly neo4jService: Neo4jService
    ) {}
    
    async findAll(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (p:Product)
            RETURN p, p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    // null, 
                    // null,
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'), 
                    row.get('price')
                )
            })
            return products.map(a => a)
        })
    }

    async findDisponible(){
        return await this.neo4jService.read(`
            MATCH (p:Product)
            WHERE p.quantity_disponible > 0
            RETURN p, p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    // null, 
                    // null,
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'), 
                    row.get('price')
                )
            })
            return products.map(a => a)
        })
    }

    async findById(idProduct: number){
        return await this.neo4jService.read(`
            MATCH (p:Product)
            WHERE id(p)=toInteger($id_product)
            RETURN p, p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, { 
            id_product: idProduct
        }).then(res => {
            const row = res.records[0]
            return new Product(
                row.get('p'),
                // null, 
                // null,
                row.get('name'),
                row.get('quantity'),
                row.get('quantity_disponible'), 
                row.get('price')
            )
        })
    }

    async edit(idProduct: number, product: UpdateProduct){
        return await this.neo4jService.write(`
            MATCH (p:Product)
            WHERE id(p)=toInteger($id_product)
            SET p.name = $product_proper.name
            RETURN p, p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            product_proper: product, id_product:idProduct
        }).then(res => {
            const row = res.records[0]
            return new Product(
                row.get('p'),
                // null, 
                // null,
                row.get('name'),
                row.get('quantity'),
                row.get('quantity_disponible'), 
                row.get('price')
            )
        });
    }

    async remove(idProduct: number){
        await this.neo4jService.read(`
            MATCH (p:Product)
            WHERE id(p)=toInteger($id_product)
            DETACH DELETE p
        `, { 
            id_product: idProduct
        })
    }

    async create(product: CreateProduct, idStoke: number): Promise<any>{
        return await this.neo4jService.write(`
            MATCH (s:Stoke) WHERE id(s) = toInteger($id_stoke)
            WITH s
            MERGE (s)-[hasp:HAS_PRODUCT]->(p:Product 
                                        {name: $product_proper.name,
                                        price: $product_proper.price})
            ON MATCH SET p.quantity_disponible = p.quantity_disponible + $product_proper.quantity,
                            p.quantity = p.quantity + $product_proper.quantity,
                            hasp.quantity_disponible = p.quantity_disponible

            ON CREATE SET p.quantity_disponible = $product_proper.quantity, 
                            p.quantity = $product_proper.quantity,
                            hasp.quantity_disponible = p.quantity_disponible,
                            hasp.quantity_sale = 0,
                            hasp.sales_count = 0
            RETURN p, p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            product_proper: product, id_stoke:idStoke
        })
        .then(res => {
            const row = res.records[0]
            return new Product(
                row.get('p'),
                // null, 
                // null,
                row.get('name'),
                row.get('quantity'),
                row.get('quantity_disponible'), 
                row.get('price')
            )
        });        
    }

}
