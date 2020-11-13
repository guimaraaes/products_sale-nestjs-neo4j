import { Injectable } from '@nestjs/common';
import { Client } from './entity/client.entity';
import { Neo4jService } from 'nest-neo4j';
import { ClientDTO } from './dto/client.dto';

@Injectable()
export class ClientsService {
    constructor(
        private readonly neo4jService: Neo4jService
    ){}

    async findAll(): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            RETURN n, n.name as name, 
                    n.cpf as cpf, 
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

    async findById(idClient: number): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            WHERE id(n)=toInteger($id_client)
            RETURN n, n.name as name, 
                    n.cpf as cpf, 
                    n.adress as adress
        `, { 
            id_client: idClient
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
    async create(client:ClientDTO): Promise<Client>{
        const response = await this.neo4jService.write(`
            MERGE (n:Client {name: $client_proper.name, cpf: $client_proper.cpf, adress: $client_proper.adress})
            RETURN n, n.name as name, 
                    n.cpf as cpf,
                    n.adress as adress
        `, {
            client_proper: client
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

    async edit(idProduct: number, product:ClientDTO): Promise<any>{
        return await this.neo4jService.read(`
            MATCH (n:Client)
            WHERE id(n)=toInteger($id_product)
            SET n.adress = $product_proper.adress
            RETURN n, n.name as name, 
                    n.cpf as cpf, 
                    n.adress as adress
        `, { 
            product_proper: product, id_product: idProduct
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

