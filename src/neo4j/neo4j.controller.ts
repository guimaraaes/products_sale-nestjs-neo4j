import { Controller } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Result } from 'neo4j-driver';

@Controller('neo4j')
export class Neo4jController {
    constructor(private readonly neo4jService: Neo4jService) {}
    read(cypher: string, params?: Record<string, any>, database?: string): Result {
        const session = this.neo4jService.getReadSession(database)
        return session.run(cypher, params)
    }
}
