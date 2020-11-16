import { Controller, Get, Res, Delete, Put, Body, HttpStatus, Param, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { SaleDTO } from './dto/sale.dto';

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

    @Get(':id')
    getById(@Param('id') id:number ){
        return this.saleService.findById(id)
    }

    @Delete(':id')
    delete(@Param('id') id:number ) {
        return this.saleService.remove(id)
    }

    @Post(':id_product/:id_client')
    post(@Body() createSaleDTO: SaleDTO, 
    @Param('id_product') idProduct: number,
    @Param('id_client') idClient: number){
        return this.saleService.create(createSaleDTO, idProduct, idClient)
    }
}
