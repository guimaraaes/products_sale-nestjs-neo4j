import { Node } from 'neo4j-driver'

export class City {
    constructor(
        private readonly city: Node,
        private readonly state: string,
        private readonly country: string,
    ) {}

    toJson(): Record<string, any> {
        return {
            ...this.city.properties,
            state: this.state,
            country: this.country,
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}