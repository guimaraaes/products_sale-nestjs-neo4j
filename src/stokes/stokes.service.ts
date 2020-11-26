import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { Ranking } from './entity/ranking.entity';
import { Stoke } from './entity/stokes.entity';

@Injectable()
export class StokesService {
    constructor(
        private readonly neo4jService: Neo4jService
    ) { }

    async findBestClients(id_stoke: number) {
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_CLIENT]->(c:Client) WHERE id(S) = toInteger($id_stoke)
            RETURN  c,
                    hasc.sum_total_sale as sum_total_sale
            ORDER BY sum_total_sale DESC 
            LIMIT 10
        `, { id_stoke: id_stoke }).then(res => {
            const raking = res.records.map(row => {
                return new Ranking(
                    row.get('c'),
                    row.get('sum_total_sale')
                )
            })
            return raking.length > 0 ? raking.map(a => a)
                : new NotFoundException('raking best clients not found')
        })
    }

    async findBestSellers(id_stoke: number) {
        return await this.neo4jService.read(`
            MATCH (S:Stoke)-[hasc:HAS_PRODUCT]->(p:Product) WHERE id(S) = toInteger($id_stoke)
            RETURN  p,
            hasc.sum_quantity_sale as sum_quantity_sale
            ORDER BY sum_quantity_sale DESC
            LIMIT 10    
        `, { id_stoke: id_stoke }).then(res => {
            const raking = res.records.map(row => {
                return new Ranking(
                    row.get('p'),
                    row.get('sum_quantity_sale')
                )
            })
            return raking.length > 0 ? raking.map(a => a)
                : new NotFoundException('raking best sellers not found')
        })
    }

    async findBestStaffs(id_stoke: number) {
        return await this.neo4jService.read(`
            MATCH (S:Stoke)<-[works:WORKS_ON]-(s:Staff) WHERE id(S) = toInteger($id_stoke)
            RETURN s,
            works.sum_quantity_sale as sum_quantity_sale
            ORDER BY sum_quantity_sale DESC
            LIMIT 10
        `, { id_stoke: id_stoke }).then(res => {
            const raking = res.records.map(row => {
                return new Ranking(
                    row.get('s'),
                    row.get('sum_quantity_sale')
                )
            })
            return raking.length > 0 ? raking.map(a => a)
                : new NotFoundException('raking best staffs not found')
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
