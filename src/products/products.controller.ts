import { Controller, Get, Post, Param, Put, Delete, Res, Body, HttpStatus, Module, Injectable} from '@nestjs/common';
import { Response } from 'express';
import { UpdateProductDTO } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Neo4jService } from 'nest-neo4j'
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/product.dto';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
        private readonly neo4jService: Neo4jService
        ) {}
        
    @Get()
    getAll(){
        return this.productService.findAll()
    }

    @Get()
    getDisponible(){
        return this.productService.findDisponible();
    }

    @Get(':target')
    getByTarget(@Param('target') target): string{
        
        return this.productService.findDisponible();
    }

    @Get(':id')
    getById(@Param() params){
        return this.productService.findById();
    }

    @Post()
    async post(@Body() createProduct:CreateProductDTO){
        const product = await this.productService.create(
            createProduct.product.name,
            createProduct.product.cotation,
            createProduct.product.image
        )
        return product.toJson()
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO) {
        return this.productService.edit();
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.remove();
    }
}


