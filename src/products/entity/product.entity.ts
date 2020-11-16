import { Node } from 'neo4j-driver'
import { Sale } from 'src/sales/entity/sale.entity'
import { Client } from 'src/clients/entity/client.entity'

export class Product {
    constructor(
        private readonly product: Node,
        // private readonly client: Client,
        // private readonly sale: Sale,
        private readonly name: string,
        private readonly quantity: number,
        private readonly quantity_disponible: number,
        private readonly price: number
   
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.product.properties,

            name: this.name,
            quantity: this.quantity,
            quantity_disponible: this.quantity_disponible,
            price: this.price,
            // client: this.client.toJson(),
            // sale: this.sale.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}