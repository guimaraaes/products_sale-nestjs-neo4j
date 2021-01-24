import { Node } from 'neo4j-driver'


export class Staff {
    constructor(
        private readonly client: Node,

        private readonly name: string,
        private readonly department: string,
        private readonly e_mail: string,
        private readonly password: string,
    ) { }

    toJson(): Record<string, any> {
        return {
            ...this.client.properties,
            name: this.name,
            department: this.department,
            e_mail: this.e_mail,
            password: this.password,
            // tagList: this.tagList.map(tag => tag.toJson()),
        }
    }
}