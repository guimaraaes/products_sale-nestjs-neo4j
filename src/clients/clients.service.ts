import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Client, ClientSales, ClientProducts } from './entity/clients.entity';
import { Neo4jService } from 'nest-neo4j';
import { UpdateClient, CreateClient } from './dto/clients.dto';

@Injectable()
export class ClientsService {
    constructor(
        private readonly neo4jService: Neo4jService,
    ) { }

    async findAll(): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (c:Client)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf 
        `).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
                    row.get('name'),
                    row.get('cpf')
                )
            })
            return clients.length > 0 ? clients.map(a => a)
                : new NotFoundException('client not found')
        })
    }

    async create(client: CreateClient): Promise<any> {
        return await this.neo4jService.write(`
            OPTIONAL MATCH (:Client2 {name: $client_proper.name, 
                cpf: $client_proper.cpf})-[rC:LIVES_ON]->(:City2)
            DELETE rC
            MERGE (c:Client2
                    {name: $client_proper.name, 
                    cpf: $client_proper.cpf})
            WITH c

            MERGE (ct:City2
                    {name: $city_proper.name, 
                    state: $city_proper.state, 
                    country: $city_proper.country})
            WITH c, ct

            MERGE (c)-[:LIVES_ON]->(ct)

            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf
        `, {
            client_proper: client,
            city_proper: client.adress
        }).then(res => {
            const row = res.records[0]
            return res.records.length ?
                new Client(
                    row.get('c'),
                    row.get('name'),
                    row.get('cpf')
                ) : new BadRequestException('error on create')
        });
    }

    async findById(idClient: number): Promise<any> {
        return await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf 
        `, {
            id_client: idClient
        }).then(res => {
            const clients = res.records.map(row => {
                return new Client(
                    row.get('c'),
                    row.get('name'),
                    row.get('cpf')
                )
            })
            return clients.length > 0 ? clients.map(a => a)
                : new NotFoundException('client not found')
        })
    }

    async edit(idClient: number, client: UpdateClient): Promise<any> {
        if (!((await this.findById(idClient)).length > 0))
            throw new NotFoundException('client not found')

        return await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c) = toInteger($id_client)
                SET c.adress = $client_proper.adress
            RETURN  c, 
                    c.name as name, 
                    c.cpf as cpf 
        `, {
            client_proper: client, id_client: idClient
        }).then(res => {
            const row = res.records[0]
            return res.records.length > 0 ?
                new Client(
                    row.get('c'),
                    row.get('name'),
                    row.get('cpf')
                ) : new BadRequestException('error on edit client')
        })
    }

    async findSales(idClient: number) {
        if (!((await this.findById(idClient)).length > 0))
            throw new NotFoundException('client not found')


        return await this.neo4jService.read(`
            MATCH (c:Client)<-[:FROM_CLIENT]-(s:Sale) WHERE id(c)=toInteger($id_client)
            RETURN  c.name as name, 
                    c.cpf as cpf,
                    s
        `, {
            id_client: idClient
        }).then(res => {
            const clientSales = res.records.map(row => {
                return new ClientSales(
                    row.get('s'),
                    row.get('name'),
                    row.get('cpf')
                )
            })
            return clientSales.length > 0 ? clientSales.map(a => a)
                : new NotFoundException('no sale found')
        })
    }

    async findProducts(idClient: number) {
        if (!((await this.findById(idClient)).length > 0))
            throw new NotFoundException('client not found')

        return await this.neo4jService.read(`
            MATCH (c:Client) WHERE id(c)=toInteger($id_client)
            OPTIONAL MATCH (c)-[:HAS_SALE_PRODUCT]->(p:Product)
            RETURN  c.name as name, 
                    c.cpf as cpf,  
                    p
        `, {
            id_client: idClient
        }).then(res => {
            const clientSales = res.records.map(row => {
                return new ClientProducts(
                    row.get('p'),
                    row.get('name'),
                    row.get('cpf')
                )
            })
            return clientSales.length > 0 ? clientSales.map(a => a)
                : new NotFoundException('no product found')
        })
    }
}

