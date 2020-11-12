import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { NeogqlModule } from './neogql/neogql.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NeogqlResolver } from './neogql/neogql.resolver';
import { Neo4jModule } from './neo4j/neo4j.module';
import { Neo4jController } from './neo4j/neo4j.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';

@Module({
  imports: [ProductsModule, ClientsModule, 
            SalesModule, Neo4jModule],
    controllers:[AppController],
    providers: [AppService, Neo4jService],
})
export class AppModule { }
