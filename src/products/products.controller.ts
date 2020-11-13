import { Controller, Get, Post, Param, Put, Delete, Res, Body, HttpStatus, Module, Injectable} from '@nestjs/common';
// import { Response } from 'express';
import { ProductDTO } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
// import { Neo4jService } from 'nest-neo4j'
import { ProductsService } from './products.service';
// import { CreateProductDTO } from './dto/product.dto';


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

    @Get()
    getDisponible(){
        return this.productService.findDisponible();
    }

    @Get('/search_by_target/:target')
    getByTarget(@Param('target') target): string{
        return this.productService.findDisponible();
    }

    @Get(':id')
    getById(@Param('id') id){
        return this.productService.findById(id);
    }

    @Post()
    post(@Body() createProduct:ProductDTO){
        const product = this.productService.create(createProduct)
        return product
    }

    @Put(':id')
    put(@Param('id') id, @Body() product: ProductDTO) {
        return this.productService.edit(id, product);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.remove();
    }
}


