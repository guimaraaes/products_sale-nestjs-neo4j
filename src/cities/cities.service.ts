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
            MATCH (ct:Client)
            RETURN  ct, 
                    ct.state as state, 
                    ct.country as country, 
        `).then(res => {
            const cities = res.records.map(row => {
                return new City(
                    row.get('ct'),
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

    async create(createCity: CreateCity){

    }

    async getId(idCity: number): Promise<City[]>{
        const found =  await this.neo4jService.read(`
                MATCH (ct:Client) WHERE id(ct) = toInteger($id_city)
                RETURN  ct, 
                        ct.state as state, 
                        ct.country as country, 
            `, {
                id_city: idCity
            }).then(res => {
                const cities = res.records.map(row => {
                    return new City(
                        row.get('ct'),
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
