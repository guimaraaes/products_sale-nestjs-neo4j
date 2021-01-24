import { Node } from 'neo4j-driver'

export class Stoke {
    constructor(
        private readonly stoke: Node,
        private readonly name: number,
        private readonly adress: number,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.stoke.properties,
            name: this.name,
            adress: this.adress,
        }
    }
}