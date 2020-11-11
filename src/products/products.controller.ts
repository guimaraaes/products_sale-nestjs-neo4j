import { Controller, Get, Post, Param, Put, Delete, Res, Body, HttpStatus} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
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
    create(@Res() res: Response){
        res.status(HttpStatus.CREATED).send();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}


