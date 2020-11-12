import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Neo4jService } from 'nest-neo4j';
import { Request } from 'express';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @Inject(REQUEST) 
        private readonly request:Request,
        private readonly neo4jService: Neo4jService
    ) {}
    async findAll(): Promise<any> {
        const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)
        return `There are ${res.records[0].get('count')} nodes in the database`
    }

    findDisponible(){
        return 'ainda em teste';
    }

    findByTarget(){
        return 'ainda em teste';
    }

    findById(){
        return 'ainda em teste';
    }

      create(name: string, cotation: number, image: string): Promise<Product>{
        const response =   this.neo4jService.write(`
            MERGE (n:Product 
            {name: $p.name, cotation: $p.cotation, image: $p.image})
            RETURN n, n.name as name,
            n.cotation as cotation,
            n.image as image
        `, {
            p: {name, cotation, image}
        })
        .then(res => {
            const row = res.records[0]
            return new Product(
                row.get('n'),
                row.get('name'),
                row.get('cotation'),
                row.get('image')
            )
        })
        ;
        return response
        
    }

    edit(){
        return 'ainda em teste';
    }

    remove(){
        return 'ainda em teste';
    }



}
