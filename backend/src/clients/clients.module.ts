import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CityService } from 'src/cities/cities.service';

@Module({
    controllers: [ClientsController],
    providers: [ClientsService, CityService],
    exports: [ClientsService]
})
export class ClientsModule { }
