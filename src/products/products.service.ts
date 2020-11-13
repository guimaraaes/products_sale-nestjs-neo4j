import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Neo4jService } from 'nest-neo4j';
import { Request } from 'express';
import { Product } from './entity/product.entity';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(REQUEST) 
        private readonly request:Request,
        private readonly neo4jService: Neo4jService
    ) {}
    
    async findAll(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (n:Product)
            RETURN n, n.name as name, 
                    n.cotation as cotation, 
                    n.image as image
        `).then(res => {
            const products = res.records.map(row => {
                return new Product(
                    row.get('n'),
                    null, 
                    null,
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'), 
                    row.get('price')
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

    async findById(idProduct: number){
        return await this.neo4jService.read(`
            MATCH (n:Product)
            WHERE id(n)=toInteger($id_product)
            RETURN n, n.name as name,
                    n.cotation as cotation,
                    n.image as image
        `, { 
            id_product: idProduct
        }).then(res => {
            const clients = res.records.map(row => {
                return new Product(
                    row.get('n'),
                    null, 
                    null,
                    row.get('name'),
                    row.get('quantity'),
                    row.get('quantity_disponible'), 
                    row.get('price')
                )
            })
            return clients.map(a => a.toJson())
        })
    }

    async create(product: ProductDTO, idStoke: number): Promise<Product>{
        return await this.neo4jService.write(`
            MERGE (p:Product 
                        {name: $product_proper.name, quantity: $product_proper.quantity, 
                        quantity_disponible: $product_proper.quantity_disponible, 
                        price: $product_proper.price})<-[HAS_PRODUCT]-(s:Stoke)
            WHERE id(s) = toInteger($id_stoke)
            RETURN p, p.name as name,
                    p.cotation as cotation,
                    p.image as image
        `, {
            product_proper: product, id_stoke:idStoke
        })
        .then(res => {
            const row = res.records[0]
            return new Product(
                row.get('n'),
                null, 
                null,
                row.get('name'),
                row.get('quantity'),
                row.get('quantity_disponible'), 
                row.get('price')
            )
        });        
    }

    async edit(idProduct: number, product: ProductDTO){
        return await this.neo4jService.write(`
            MATCH (n:Product)
            WHERE id(n)=toInteger($id_product)
            SET n.quantity = n.quantity + $product_proper.quantity,
                n.quantity_disponible = n.quantity_disponible + $product_proper.quantity_disponible
            RETURN n, n.name as name,
                    n.cotation as cotation,
                    n.image as image
        `, {
            product_proper: product, id_product:idProduct
        }).then(res => {
            const row = res.records[0]
            return new Product(
                row.get('n'),
                null, 
                null,
                row.get('name'),
                row.get('quantity'),
                row.get('quantity_disponible'), 
                row.get('price')
            )
        });
    }

    remove(){
        return 'ainda em teste';
    }



}
