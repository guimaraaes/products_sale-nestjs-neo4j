import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Stoke } from './entity/stokes.entity';

@Injectable()
export class StokesService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findBestClients(){
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_CLIENT]->(c:Client)
            RETURN  c,
                    hasc.sum_total_sale as sum_total_sale
            ORDER BY sum_total_sale DESC 
            LIMIT 10
        `).then(res=>{
            const raking = res.records.map(row => {
                return new Stoke(
                    row.get('c'),
                    row.get('sum_total_sale')
                )
            })
            return raking.map(a => a)
        })
        // sum_total_sale
    }

    async findBestSellers(){
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_PRODUCT]->(p:Product)
            RETURN  p,
            hasc.sum_quantity_sale as sum_quantity_sale
            ORDER BY sum_quantity_sale DESC
            LIMIT 10    
        `).then(res =>{
            const raking = res.records.map(row =>{
                return new Stoke(
                    row.get('p'),
                    row.get('sum_quantity_sale')
                )
            })
            return raking.map(a=>a)
        })
        //sum_quantity_sale
        
    }

}
