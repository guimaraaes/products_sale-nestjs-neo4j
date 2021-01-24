import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductsModule } from 'src/products/products.module';
import { StaffModule } from 'src/staff/staff.module';

@Module({
    imports: [ProductsModule, ClientsModule, StaffModule],
    controllers: [SalesController],
    providers: [SalesService],
})
export class SalesModule { }
