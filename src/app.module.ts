import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { HOSTNAME, NEO4J_PASSWORD } from './config';

@Module({
  imports: [ProductsModule, ClientsModule, 
            SalesModule, Neo4jModule.forRoot({
              scheme: 'bolt',
              host: HOSTNAME,
              port: 33884,
              username: 'neo4j',
              password: NEO4J_PASSWORD
            })],
    controllers:[AppController],
    providers: [AppService],
})
export class AppModule { }
