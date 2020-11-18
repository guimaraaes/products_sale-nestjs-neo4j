import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Ranking } from './entity/ranking.entity';
import { CreateStoke } from './dto/stokes.dto';
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
        const foundclients =  await this.neo4jService.read(`
        MATCH (S:Stoke)
        RETURN  S, 
                S.name as name, 
                S.adress as adress
        `).then(res => {
            const clients = res.records.map(row => {
                return new Stoke(
                    row.get('S'),
                    row.get('name'),
                    row.get('adress')
                )
            })
            return clients.map(a => a)
        })
        if (foundclients.length == 0){
            return {message: 'none product'}
        }
        return foundclients
    }

    async create(stoke: CreateStoke){
        return await this.neo4jService.write(`
            MERGE (S:Stoke 
                    {name: $stoke_proper.name, 
                    adress: $stoke_proper.adress})
            RETURN  S, 
                    S.name as name, 
                    S.adress as adress
        `, {
            stoke_proper: stoke
        })
        .then(res => {
            const row = res.records[0]
            return new Stoke(
                row.get('S'),
                row.get('name'),
                row.get('adress')
            )
        });
    }


    async findById(idStoke: number){
        const found =  await this.neo4jService.read(`
        MATCH (S:Stoke) WHERE id(S) = toInteger($id_stoke)
        RETURN  S, 
                S.name as name, 
                S.adress as adress
        `, { 
            id_stoke: idStoke
        }).then(res => {
            const stokes = res.records.map(row => {
                return new Stoke(
                    row.get('S'),
                    row.get('name'),
                    row.get('adress')
                )
            })
            return stokes.map(a => a)
        })
        if (found.length == 0 ){
            throw new NotFoundException('Stoke not found')
        }
        return found
    }

}
