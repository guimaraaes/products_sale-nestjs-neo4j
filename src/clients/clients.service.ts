import { Injectable, NotFoundException } from '@nestjs/common';
import { Client } from './entity/clients.entity';
import { Neo4jService } from 'nest-neo4j';
import {  UpdateClient, CreateClient } from './dto/clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findAll(): Promise<any>{
        const foundclients =  await this.neo4jService.read(`
            MATCH (c:Client)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress
        `).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
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

    async create(client:CreateClient): Promise<any>{
        const response = await this.neo4jService.write(`
            MERGE (c:Client 
                    {name: $client_proper.name, 
                    cpf: $client_proper.cpf, 
                    adress: $client_proper.adress})
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress
        `, {
            client_proper: client
        })
        .then(res => {
            const row = res.records[0]
            return new Client(
                row.get('c'),
                null,
                null,
                row.get('name'),
                row.get('cpf'),
                row.get('adress')
            )
        });
        return response
    }

    async findById(idClient: number): Promise<Client[]>{
        const found =  await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c)=toInteger($id_client)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress
        `, { 
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a)
        })
        if (found.length == 0 ){
            throw new NotFoundException('Client not found')
            
        }
        return found
    }

    async edit(idClient: number, client:UpdateClient): Promise<any>{
        const found = (await this.findById(idClient)).length
        if (typeof( found) != 'number')
             return found
        return await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
                SET c.adress = $client_proper.adress
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress
        `, { 
            client_proper: client, id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
                    null,
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a)
        })

    }

    async findSales(idClient: number){
        const found = (await this.findById(idClient)).length
        if (typeof( found) != 'number')
             return found
        return await this.neo4jService.read(`
            MATCH (c:Client)<-[:FROM_CLIENT]-(s:Sale) WHERE id(c)=toInteger($id_client)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress,
                    s
        `, { 
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    null,
                    row.get('s'),
                    null,
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a)
        })
 
    }

    async findProducts(idClient: number){
        const found = (await this.findById(idClient)).length
        if (typeof( found) != 'number')
             return found
        return await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c)=toInteger($id_client)
            OPTIONAL MATCH (c)-[:HAS_SALE_PRODUCT]->(p:Product)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress, 
                    p
        `, { 
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    null,
                    null,
                    row.get('p'),
                    row.get('name'),
                    row.get('cpf'), 
                    row.get('adress')
                )
            })
            return clients.map(a => a)
        })
    }
}

