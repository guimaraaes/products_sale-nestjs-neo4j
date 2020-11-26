import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Ranking } from './entity/ranking.entity';
import { Stoke } from './entity/stokes.entity';

@Injectable()
export class StokesService {
    constructor(
        private readonly neo4jService: Neo4jService
    ) { }

    async findBestClients() {
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_CLIENT]->(c:Client)
            RETURN  c,
                    hasc.sum_total_sale as sum_total_sale
            ORDER BY sum_total_sale DESC 
            LIMIT 10
        `).then(res => {
            const raking = res.records.map(row => {
                return new Ranking(
                    row.get('c'),
                    row.get('sum_total_sale')
                )
            })
            return raking.length > 0 ? raking.map(a => a)
                : new NotFoundException('raking not found')
        })
    }

    async findBestSellers() {
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_PRODUCT]->(p:Product)
            RETURN  p,
            hasc.sum_quantity_sale as sum_quantity_sale
            ORDER BY sum_quantity_sale DESC
            LIMIT 10    
        `).then(res => {
            const raking = res.records.map(row => {
                return new Ranking(
                    row.get('p'),
                    row.get('sum_quantity_sale')
                )
            })
            return raking.length > 0 ? raking.map(a => a)
                : new NotFoundException('raking not found')
        })
    }

    async findAll() {
        return await this.neo4jService.read(`
        MATCH (S:Stoke)
        RETURN  S, 
                S.name as name, 
                S.adress as adress
        `).then(res => {
            const stokes = res.records.map(row => {
                return new Stoke(
                    row.get('S'),
                    row.get('name'),
                    row.get('adress')
                )
            })
            return stokes.length > 0 ? stokes.map(a => a)
                : new NotFoundException('stokes not found')
        })
    }
}
