import { Node } from 'neo4j-driver'
import { Sale } from 'src/sales/entity/sales.entity'
import { Product } from 'src/products/entity/products.entity'

export class Client {
    constructor(
        private readonly client: Node,
        private readonly sale: Sale,
        private readonly product: Product,

        private readonly name: string,
        private readonly cpf: string,
        private readonly adress: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            name: this.name,
            cpf: this.cpf,
            adress: this.adress,
            sale: this.sale.toJson(),
            product: this.product.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}