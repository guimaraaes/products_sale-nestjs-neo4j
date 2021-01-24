import { Injectable, NotFoundException } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';
import { City } from './entity/cities.entity';

@Injectable()
export class CityService {
    constructor(
        private readonly neo4jService: Neo4jService
    ) { }

    async findAll() {
        return await this.neo4jService.read(`
            MATCH (ct:City)
            RETURN  ct, 
                    ct.name as name, 
                    ct.state as state, 
                    ct.country as country
        `).then(res => {
            const cities = res.records.map(row => {
                return new City(
                    row.get('ct'),
                    row.get('name'),
                    row.get('state'),
                    row.get('country')
                )
            })
            if (cities.length > 0)
                return cities.map(a => a)
            throw new NotFoundException('cities not found')
        })
    }
}
