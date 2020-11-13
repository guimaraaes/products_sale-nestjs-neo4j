import { Controller, Get, Res, Delete, Put, Body, HttpStatus, Param, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { Response } from 'express';
import { SaleDTO } from './dto/sale.dto';
import { runInThisContext } from 'vm';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
    constructor(
        private readonly saleService: SalesService
    ) {}

    @Get()
    getAll(){
        return this.saleService.findAll()
    }

    @Get()
    getDisponible(){
        return this.saleService.findAll()
    }

    @Get('/search_by_target/:target')
    getByTarget(@Param('target') target){
        return this.saleService.findAll()
    }

    @Get(':id')
    getById(@Param('id') id:number ){
        return this.saleService.findById(id)
    }

    @Post()
    post(@Body() createSaleDTO: SaleDTO){
        const response = this.saleService.create(createSaleDTO)
        return response
    }

    @Put(':id')
    put(@Param('id') id: string ) {
        return this.saleService.findAll()
    }

    @Delete(':id')
    delete(@Param('id') id: string ) {
        return this.saleService.findAll()
    }

}
