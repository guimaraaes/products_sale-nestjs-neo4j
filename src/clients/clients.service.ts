import { Injectable } from '@nestjs/common';
import { Client } from './entity/client.entity';
import { Neo4jService } from 'nest-neo4j';
import { ClientDTO, UpdateClient, CreateClient } from './dto/client.dto';

@Injectable()
export class ClientsService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findAll(): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (c:Client)
            RETURN c, c.name as name, 
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
    }

    async create(client:CreateClient): Promise<Client>{
        const response = await this.neo4jService.write(`
            MERGE (c:Client 
                    {name: $client_proper.name, 
                    cpf: $client_proper.cpf, 
                    adress: $client_proper.adress})
            RETURN c, c.name as name, 
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

    async findById(idClient: number): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (c:Client)
            WHERE id(c)=toInteger($id_client)
            RETURN c, c.name as name, 
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
    }

    async edit(idProduct: number, product:UpdateClient): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (c:Client)
            WHERE id(c)=toInteger($id_product)
            SET c.adress = $product_proper.adress
            RETURN c, c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress
        `, { 
            product_proper: product, id_product: idProduct
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
        return await this.neo4jService.read(`
            MATCH (c:Client)<-[:FROM_CLIENT]-(s:Sale)
            WHERE id(c)=toInteger($id_client)
            RETURN c, c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress, s
        `, { 
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
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
        return await this.neo4jService.read(`
            MATCH (c:Client)
            WHERE id(c)=toInteger($id_client)
            OPTIONAL MATCH (c)-[:HAS_SALE_PRODUCT]->(p:Product)
            RETURN c, c.name as name, 
                    c.cpf as cpf, 
                    c.adress as adress, p
        `, { 
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
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

