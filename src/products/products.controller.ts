import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { UpdateProduct, CreateProduct } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Integer } from 'neo4j-driver';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
    ) {}
        
    @Get()
    getAll(){
        return this.productService.findAll()
    }

    @Get('/disponible')
    getDisponible(){
        return this.productService.findDisponible();
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.productService.findById(id);
    }    
    
    @Put(':id')
    put(@Body() product: UpdateProduct, @Param('id') id: number) {
        return this.productService.edit(id, product);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productService.remove(id);
    }

    @Post(':id_stoke')
    post(@Body() createProduct:CreateProduct, @Param('id_stoke') idStoke: number){
        const product = this.productService.create(createProduct, idStoke)
        return product
    }
}


