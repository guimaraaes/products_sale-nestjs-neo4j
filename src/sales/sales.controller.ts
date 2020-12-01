import { Controller, Get, Res, Delete, Put, Body, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { CreateSale } from './dto/sales.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
    constructor(
        private readonly saleService: SalesService
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all sales' })
    @ApiOkResponse({ description: 'sales found' })
    @ApiNotFoundResponse({ description: 'no sale found' })
    getAll() {
        return this.saleService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'get sale by id' })
    @ApiOkResponse({ description: 'sale found' })
    @ApiNotFoundResponse({ description: 'sale not found' })
    getById(@Param('id') id: number) {
        return this.saleService.findById(id)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete sale by id' })
    @ApiNotFoundResponse({ description: 'sale not found' })
    delete(@Param('id') id: number) {
        return this.saleService.remove(id)
    }

    @Post(':id_product/:id_client/:id_staff')
    @ApiOperation({ summary: 'create sale' })
    @ApiNotFoundResponse({ description: 'client not found | staff not found | product not found' })
    @ApiCreatedResponse({ description: 'sale created' })
    @ApiBadRequestResponse({ description: 'error on create client' })
    @UsePipes(ValidationPipe)
    post(@Body() createSaleDTO: CreateSale,
        @Param('id_product') idProduct: number,
        @Param('id_client') idClient: number,
        @Param('id_staff') id_staff: number) {
        return this.saleService.create(createSaleDTO, idProduct, idClient, id_staff)
    }
}
