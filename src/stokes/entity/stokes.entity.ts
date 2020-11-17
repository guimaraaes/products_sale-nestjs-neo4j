import { Node } from 'neo4j-driver'
import { Client } from 'src/clients/entity/client.entity'
import { Product } from 'src/products/entity/product.entity'

export class Stoke {
    constructor(
        private readonly product_client: Node,
        // private readonly client: Client,
        // private readonly product: Product,

        // private readonly name: string,
        private readonly raking: number,
        // private readonly total_sale: number,
        // private readonly quantity_sale: number
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.product_client.properties,
            type_payment: this.raking,
            // quantity_parcels: this.quantity_parcels,
            // total_sale: this.total_sale,
            // quantity_sale: this.quantity_sale,
            // client: this.client.toJson(),
            // product: this.product.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}