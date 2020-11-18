import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCity } from './dto/cities.dto';
import { Neo4jService } from 'nest-neo4j';
import { City } from './entity/cities.entity';

@Injectable()
export class CityService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}
    async findAll(){
        const foundcities =  await this.neo4jService.read(`
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
            return cities.map(a => a)
        })
        if (foundcities.length == 0){
            return {message: 'none city'}
        }
        return foundcities
    }

    async create(city: CreateCity): Promise<any>{
        return await this.neo4jService.write(`
            MERGE (ct:City 
                    {name: $city_proper.name, 
                    state: $city_proper.state, 
                    country: $city_proper.country})
            RETURN  ct, 
                    ct.name as name, 
                    ct.state as state, 
                    ct.country as country
        `, {
            city_proper: city
        })
        .then(res => {
            const row = res.records[0]
            return new City(
                row.get('c'),
                row.get('name'),
                row.get('state'),
                row.get('country')
            )
        });
    }

    async getId(idCity: number): Promise<City[]>{
        const found =  await this.neo4jService.read(`
                MATCH (ct:City) WHERE id(ct) = toInteger($id_city)
                RETURN  ct, 
                        ct.name as name, 
                        ct.state as state, 
                        ct.country as country
            `, {
                id_city: idCity
            }).then(res => {
                const cities = res.records.map(row => {
                    return new City(
                        row.get('ct'),
                        row.get('name'),
                        row.get('state'),
                        row.get('country')
                    )
                })
                return cities.map(a => a)
            })
            if (found.length == 0){
                throw new NotFoundException('city not found')
            }
            return found
    }
}
