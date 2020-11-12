import { Node } from 'neo4j-driver'
// import { User } from '../../user/entity/user.entity'
// import { Tag } from './tag.entity'

export class Product {
    constructor(
        private readonly product: Node,
        // private readonly client: Client,
        // private readonly sale: Sale,

        private readonly name: string,
        private readonly cotation: string,
        private readonly image: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.product.properties,
            name: this.name,
            cotation: this.cotation,
            image: this.image,
            // client: this.client.toJson(),
            // sale: this.sale.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}