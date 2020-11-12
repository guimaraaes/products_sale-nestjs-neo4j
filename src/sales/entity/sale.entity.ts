import { Node } from 'neo4j-driver'
// import { Client } from '../../user/entity/client.entity'
// import { Product } from './product.entity'

export class Sale {
    constructor(
        private readonly sale: Node,
        // private readonly client: Client,
        // private readonly sale: Product,

        private readonly total_sale: string,
        private readonly type_payment: string,
        private readonly quantity_parcels: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.sale.properties,
            total_sale: this.total_sale,
            type_payment: this.type_payment,
            quantity_parcels: this.quantity_parcels,
            // client: this.client.toJson(),
            // sale: this.sale.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}