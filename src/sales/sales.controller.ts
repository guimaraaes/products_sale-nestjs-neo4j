import { Controller, Get, Res, Delete, Put, Body, HttpStatus, Param, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SalesService } from './sales.service';
import { Response } from 'express';
import { CreateSaleDTO } from './dto/create-sale.dto';

@ApiTags('sales')
@Controller('sales')
export class SalesController {

    constructor(private productsService: SalesService) {}
    @Get()
    findAll(): string{
        return 'todos';
    }

    @Get()
    findDisponible(): string{
        return 'todos disponíveis';
    }

    @Get(':target')
    findByTarget(@Param('target') target): string{
        return 'todos por tagetas';
    }

    @Get(':id')
    findById(@Param() params): string{
        console.log(params.id)
        return 'todos pelo id';
    }

    @Post()
    create(@Res() res: Response, @Body() createSaleDTO: CreateSaleDTO){
        res.status(HttpStatus.CREATED).send();
    }

    @Put(':id')
    update(@Param('id') id: string) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }

}
