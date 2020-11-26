import { Controller, Get, Post, Put, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StokesService } from './stokes.service';
import { CreateStoke } from './dto/stokes.dto';

@ApiTags('stokes')
@Controller('stokes')
export class StokesController {
    constructor(
        private readonly serviceStoke: StokesService
    ) { }


    @Get('best_clients')
    getBestClients() {
        return this.serviceStoke.findBestClients()
    }

    @Get('best_sellers')
    getBestSellers() {
        return this.serviceStoke.findBestSellers()
    }


    @Get('best_staffs')
    getBestStaffs() {
        return this.serviceStoke.findBestSellers()
    }

    @Get()
    getAll() {
        return this.serviceStoke.findAll()
    }
}
