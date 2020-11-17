import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from 'nest-neo4j'
import { HOSTNAME, NEO4J_PASSWORD, SCHEMA, PORT, NEO4J_USER } from './config';
import { StokesModule } from './stokes/stokes.module';
import { StaffModule } from './staff/staff.module';
import { CityModule } from './cities/cities.module';

@Module({
  imports: [ProductsModule, ClientsModule, 
            SalesModule, StokesModule, Neo4jModule.forRoot({
              scheme: SCHEMA,
              host: HOSTNAME,
              port: PORT,
              username: NEO4J_USER,
              password: NEO4J_PASSWORD
            }), StaffModule, CityModule],
    controllers:[AppController],
    providers: [AppService],
})
export class AppModule { }
