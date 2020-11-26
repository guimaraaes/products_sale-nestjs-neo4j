import { Injectable, Inject, NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Neo4jService } from 'nest-neo4j';
import { Request } from 'express';
import { Product } from './entity/products.entity';
import { UpdateProduct, CreateProduct } from './dto/products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
        private readonly neo4jService: Neo4jService
    ) { }

    async findAll(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (p:Product)
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price')
                )
            })
            return products.length > 0 ? products.map(a => a)
                : new NotFoundException('product not found')
        })
    }

    async findDisponible(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (p:Product) WHERE p.quantity_disponible > 0
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price')
                )
            })
            return products.length > 0 ? products.map(a => a)
                : new NotFoundException('product not found')
        })
    }

    async findDisponibleById(idProduct: number): Promise<any> {
        this.findById(idProduct)
        return await this.neo4jService.read(`
            MATCH (p:Product) WHERE p.quantity_disponible > 0 AND id(p) = toInteger($id_product)
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            id_product: idProduct
        }).then(res => {
            const product = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price')
                )
            })
            return product.length > 0 ? product.map(a => a)
                : new NotFoundException('product not found')
        })

    }

    async findById(idProduct: number): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (p:Product)
            WHERE id(p)=toInteger($id_product)
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            id_product: idProduct
        }).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price')
                )
            })
            return products.length > 0 ? products.map(a => a)
                : new NotFoundException('product not found')
        })
    }

    async edit(idProduct: number, product: UpdateProduct) {
        if (!((await this.findById(idProduct)).length > 0))
            throw new NotFoundException('product not found')

        return await this.neo4jService.write(`
            MATCH (p:Product)
            WHERE id(p)=toInteger($id_product)
            SET p.name = $product_proper.name
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            product_proper: product, id_product: idProduct
        }).then(res => {
            const row = res.records[0]
            return res.records.length > 0 ?
                new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price')
                ) : new BadRequestException('error on update')
        });
    }

    async create(product: CreateProduct, id_stoke: number): Promise<any> {
        return await this.neo4jService.write(`
            MATCH (s:Stoke) WHERE id(s) = toInteger($id_stoke)
            WITH s
            MERGE (s)-[hasp:HAS_PRODUCT]->(p:Product {name: $product_proper.name, price: $product_proper.price})
            ON MATCH SET p.quantity_disponible = p.quantity_disponible + $product_proper.quantity,
                            p.quantity = p.quantity + $product_proper.quantity,
                            hasp.quantity_disponible = p.quantity_disponible

            ON CREATE SET p.quantity_disponible = $product_proper.quantity, 
                            p.quantity = $product_proper.quantity,
                            hasp.quantity_disponible = p.quantity_disponible,
                            hasp.sum_quantity_sale = 0,
                            hasp.sales_count = 0
            RETURN  p, 
                    p.name as name,
                    p.quantity as quantity,
                    p.quantity_disponible as quantity_disponible,
                    p.price as price
        `, {
            product_proper: product, id_stoke: id_stoke
        }).then(res => {
            const row = res.records[0]
            return res.records.length > 0 ? (
                new Product(
                    row.get('p'),
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'),
                    row.get('price'))
            ) : new BadRequestException('error on create')
        });
    }

}
