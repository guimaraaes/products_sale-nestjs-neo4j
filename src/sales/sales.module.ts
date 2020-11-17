import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ProductsService } from 'src/products/products.service';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductsModule } from 'src/products/products.module';
import { ClientsService } from 'src/clients/clients.service';

@Module({
    imports: [ProductsModule, ClientsModule],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule {}
