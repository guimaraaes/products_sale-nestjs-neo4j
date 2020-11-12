import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
// import { Neo4jService } from 'src/neo4j/neo4j.service';
// import { Neo4jModule } from 'src/neo4j/neo4j.module';
// import { NEO4J_CONFIG } from 'src/neo4j/neo4j.constants';
// import { Neo4jController } from 'src/neo4j/neo4j.controller';

@Module({
    imports: [ ],
    controllers:[ProductsController],
    providers:[ProductsService]
})
export class ProductsModule {}
