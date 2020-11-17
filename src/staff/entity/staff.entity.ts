import { Node } from 'neo4j-driver'
import { Sale } from 'src/sales/entity/sales.entity'
import { Product } from 'src/products/entity/products.entity'

export class Staff {
    constructor(
        private readonly client: Node,
        private readonly sale: Sale,
        private readonly product: Product,

        private readonly name: string,
        private readonly department: string,
        private readonly e_mail: string,
        private readonly password: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            name: this.name,
            department: this.department,
            e_mail: this.e_mail,
            password: this.password,
            sale: this.sale.toJson(),
            product: this.product.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}