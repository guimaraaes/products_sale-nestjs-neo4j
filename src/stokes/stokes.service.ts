import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class StokesService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findBestClients(){

    }

    async findBestSellers(){
        
    }

}
