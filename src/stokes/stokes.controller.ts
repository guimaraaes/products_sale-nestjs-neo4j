import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StokesService } from './stokes.service';

@ApiTags('stokes')
@Controller('stokes')
export class StokesController {
    constructor(
        private readonly serviceStoke: StokesService
    ){}


    @Get('best_clients')
    getBestClients(){
        return this.serviceStoke.findBestClients()
    }
    
    @Get('best_sellers')
    getBestSellers(){
        return this.serviceStoke.findBestSellers()
    }
    
}
