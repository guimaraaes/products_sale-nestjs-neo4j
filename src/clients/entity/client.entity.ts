import { Node } from 'neo4j-driver'
// import { Sale } from '../../user/entity/sale.entity'
// import { Product } from './product.entity'

export class Client {
    constructor(
        private readonly client: Node,
        // private readonly sale: Sale,
        // private readonly product: Product,

        private readonly name: string,
        private readonly mean_time_to_pay: string,
        private readonly image: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            name: this.name,
            mean_time_to_pay: this.mean_time_to_pay,
            image: this.image,
            // sale: this.sale.toJson(),
            // product: this.product.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}