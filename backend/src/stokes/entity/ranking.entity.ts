import { Node } from 'neo4j-driver'
import { Client } from 'src/clients/entity/clients.entity'
import { Product } from 'src/products/entity/products.entity'

export class Ranking {
    constructor(
        private readonly product_client: Node,
        private readonly raking: number,

    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.product_client.properties,
            type_payment: this.raking,
        }
    }
}