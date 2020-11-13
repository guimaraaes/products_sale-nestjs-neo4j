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
        RETURN n, n.name as name, n.cotation as cotation, 
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

    async findById(id: number){
        return await this.neo4jService.read(`
            MATCH (n:Product)
            WHERE id(n)=toInteger($p.id)
            RETURN n, n.name as name,
                    n.cotation as cotation,
                    n.image as image
        `, { 
            p: {id}
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

    async create(product: ProductDTO): Promise<Product>{
        return await this.neo4jService.write(`
            MERGE (n:Product 
            {name: $p.name, cotation: $p.cotation, image: $p.image})
            RETURN n, n.name as name,
            n.cotation as cotation,
            n.image as image
        `, {
            p: product
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

    async edit(id: number, product: ProductDTO){
        return await this.neo4jService.write(`
            MERGE (n:Product)
            WHERE id(n)=toInteger($_p.id)
            RETURN n, n.name as name,
                    n.cotation as cotation,
                    n.image as image
        `, {
            _p: {id},
            p: product
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
