import { Node, DateTime } from 'neo4j-driver'
import { Client } from 'src/clients/entity/client.entity'
import { Product } from 'src/products/entity/product.entity'

export class Sale {
    constructor(
        private readonly sale: Node,
        // private readonly client: Client,
        // private readonly product: Product,

        private readonly type_payment: string,
        private readonly quantity_parcels: number,
        private readonly total_sale: number,
        private readonly quantity_sale: number,
        private readonly date: Date
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.sale.properties,
            type_payment: this.type_payment,
            quantity_parcels: this.quantity_parcels,
            total_sale: this.total_sale,
            quantity_sale: this.quantity_sale,
            date: this.date,
            // client: this.client.toJson(),
            // product: this.product.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}