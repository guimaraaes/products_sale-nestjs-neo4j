import { Resolver, Query, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { HOSTNAME, NEO4J_USER, NEO4J_PASSWORD } from '../config';
import { Connection, relation, node } from 'cypher-query-builder';
import {Product} from '../app.graphql';
import { NotFoundException } from '@nestjs/common';

// const db = new Connection(`${HOSTNAME}`, {
//     username: NEO4J_USER,
//     password: NEO4J_PASSWORD,
// });

@Resolver('Product')
export class NeogqlResolver {
    // @Query()
    // async findAll(): Promise<Product>{
    //     const products = (await db 
    //         .matchNode('products', 'Product')
    //         .return([
    //             {
    //                 products: [{name: 'name'}]
    //             }
    //         ])    
    //         .run()) as any;
    //         console.log('prod: ' + products)
    //     return products;
    // }

    // @Query('product')
    // async findByID(@Args('id') id:string): Promise<any>{
    //     const product = (await db
    //         .matchNode('product', 'Product')
    //         .where({'product.id': id})
    //         .return([
    //             {
    //                 product: [{name: 'name'}]
    //             },
    //         ])
    //         .run<any>()) as any;
    //     if (product.lenght === 0){
    //         throw new NotFoundException(
    //             `Product id '${id}' does not exist in database`,
    //         );
    //     }
    //     return product[0]
    // }

    // @ResolveProperty()
    // async sales(@Parent() product: any){
    //     const { id } = product;
    //     return (await db
    //         .match([    node('products', 'Product'), 
    //                     relation('in'), 
    //                     node('product', 'Product')]
    //                 )
    //         .where({'product.id': id})
    //         .return([
    //             {
    //                 sale:[
    //                     {
    //                         id: 'id',
    //                         total_sale: 'total_sale',
    //                         type_payment: 'type_payment',
    //                         quantity_parcels: 'quantity_parcels',
    //                     }
    //                 ]
    //             }
    //         ])
    //         .run()) as any;
    // }
}
