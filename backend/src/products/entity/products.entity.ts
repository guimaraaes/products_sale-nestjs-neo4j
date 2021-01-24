import { Node } from 'neo4j-driver'

export class Product {
    constructor(
        private readonly product: Node,

        private readonly name: string,
        private readonly quantity: number,
        private readonly quantity_disponible: number,
        private readonly price: number

    ) { }

    toJson(): Record<string, any> {
        return {
            ...this.product.properties,
            name: this.name,
            quantity: this.quantity,
            quantity_disponible: this.quantity_disponible,
            price: this.price,
        }
    }
}