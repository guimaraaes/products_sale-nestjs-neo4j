import { Injectable } from '@nestjs/common';
import { Client } from './entity/client.entity';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class ClientsService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findAll(): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            RETURN n, n.name as name, n.cpf as cpf, 
            n.adress as adress
        `).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('n'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a.toJson())
        })
 
    }

    findByTarget(){

    }

    async findById(id: number): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            WHERE id(n)=toInteger($p.id)
            RETURN n, n.name as name, n.cpf as cpf, 
            n.adress as adress
        `, { 
            p: {id}
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('n'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a.toJson())
        })
 
    }
    s
    async create(name: string, cpf: string, adress:string): Promise<Client>{
        const response = await this.neo4jService.write(`
            MERGE (n:Client 
            {name: $p.name, cpf: $p.cpf, adress: $p.adress})
            RETURN n, n.name as name, n.cpf as cpf,
            n.adress as adress
        `, {
            p: {name, cpf, adress}
        })
        .then(res => {
            const row = res.records[0]
            return new Client(
                row.get('n'),
                null,
                null,
                row.get('name'),
                row.get('cpf'),
                row.get('adress')
            )
        });
        return response

    }

    async edit(id: number, name: string, cpf: string, adress: string): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            WHERE id(n)=toInteger($p.id)
            RETURN n, n.name as name, n.cpf as cpf, 
            n.adress as adress
        `, { 
            p: {id}
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('n'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a.toJson())
        })

    }

}

