import { Node } from 'neo4j-driver'
import { Sale } from 'src/sales/entity/sales.entity'
import { Product } from 'src/products/entity/products.entity'
import { Stoke } from 'src/stokes/entity/stokes.entity'

export class Staff {
    constructor(
        private readonly client: Node,
        private readonly stoke: Stoke,

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
            stoke: this.stoke.toJson(),
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}