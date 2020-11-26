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


    @Get(':id/best_clients')
    getBestClients(@Param('id') id: number) {
        return this.serviceStoke.findBestClients(id)
    }

    @Get(':id/best_sellers')
    getBestSellers(@Param('id') id: number) {
        return this.serviceStoke.findBestSellers(id)
    }


    @Get(':id/best_staffs')
    getBestStaffs(@Param('id') id: number) {
        return this.serviceStoke.findBestStaffs(id)
    }

    @Get()
    getAll() {
        return this.serviceStoke.findAll()
    }
}
