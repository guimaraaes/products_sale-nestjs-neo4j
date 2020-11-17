import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Ranking } from './entity/ranking.entity';
import { CreateStoke } from './dto/stokes.dto';

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
                return new Ranking(
                    row.get('c'),
                    row.get('sum_total_sale')
                )
            })
            return raking.map(a => a)
        })
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
                return new Ranking(
                    row.get('p'),
                    row.get('sum_quantity_sale')
                )
            })
            return raking.map(a=>a)
        })        
    }
    async findAll(){

    }

    async create(createStoke: CreateStoke){

    }


    async getId(idStoke: number){

    }

}
