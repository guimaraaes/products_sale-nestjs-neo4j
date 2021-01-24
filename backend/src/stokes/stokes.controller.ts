import { Controller, Get, Post, Put, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { StokesService } from './stokes.service';
import { CreateStoke } from './dto/stokes.dto';

@ApiTags('stokes')
@Controller('stokes')
export class StokesController {
    constructor(
        private readonly serviceStoke: StokesService
    ) { }


    @Get(':id/best_clients')

    @ApiOperation({ summary: 'get best clients by id stoke' })
    @ApiOkResponse({ description: 'best clients found' })
    @ApiNotFoundResponse({ description: 'best clients not found' })
    getBestClients(@Param('id') id: number) {
        return this.serviceStoke.findBestClients(id)
    }

    @Get(':id/best_sellers')
    @ApiOperation({ summary: 'get best sellers by id stoke' })
    @ApiOkResponse({ description: 'best sellers found' })
    @ApiNotFoundResponse({ description: 'best sellers not found' })
    getBestSellers(@Param('id') id: number) {
        return this.serviceStoke.findBestSellers(id)
    }


    @Get(':id/best_staffs')
    @ApiOperation({ summary: 'get best staffs by id stoke' })
    @ApiOkResponse({ description: 'best staffs found' })
    @ApiNotFoundResponse({ description: 'best staffs not found' })
    getBestStaffs(@Param('id') id: number) {
        return this.serviceStoke.findBestStaffs(id)
    }

    @Get()
    @ApiOperation({ summary: 'get all stokes' })
    @ApiOkResponse({ description: 'stokes found' })
    @ApiNotFoundResponse({ description: 'no stoke found' })
    getAll() {
        return this.serviceStoke.findAll()
    }
}
