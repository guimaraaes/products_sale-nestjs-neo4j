import { Node } from 'neo4j-driver'
import { Sale } from 'src/sales/entity/sales.entity'
import { Product } from 'src/products/entity/products.entity'

export class Client {
    constructor(
        private readonly client: Node,
        private readonly name: string,
        private readonly cpf: string,
    ) { }

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            name: this.name,
            cpf: this.cpf,
        }
    }
}

export class ClientSales {
    constructor(
        private readonly sale: Node,
        private readonly name: string,
        private readonly cpf: string,
    ) { }
}

export class ClientProducts {
    constructor(
        private readonly products: Node,
        private readonly name: string,
        private readonly cpf: string,
    ) { }
}