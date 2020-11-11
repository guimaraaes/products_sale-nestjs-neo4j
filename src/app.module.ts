import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [ProductsModule, ClientsModule, SalesModule],
})
export class AppModule { }
