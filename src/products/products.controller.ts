import { Controller, Get, Post, Param, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateProduct, CreateProduct } from './dto/products.dto';
import { ApiTags, ApiQuery, ApiParam, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService: ProductsService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all products' })
    @ApiOkResponse({ description: 'products found' })
    @ApiNotFoundResponse({ description: 'no product found' })
    getAll() {
        return this.productService.findAll()
    }

    @Get('/disponible/')
    @ApiOperation({ summary: 'get all disponibles products' })
    @ApiOkResponse({ description: 'disponible products found' })
    @ApiNotFoundResponse({ description: 'no disponible product found' })
    getDisponible() {
        return this.productService.findDisponible();
    }

    @Get('/disponible/:id')
    @ApiOperation({ summary: 'get disponible product by id' })
    @ApiOkResponse({ description: 'product found' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getDisponibleById(@Param('id') id: number) {
        return this.productService.findDisponibleById(id);
    }


    @Get(':id')
    @ApiOperation({ summary: 'get product by id' })
    @ApiOkResponse({ description: 'product found' })
    @ApiNotFoundResponse({ description: 'product not found' })
    getById(@Param('id') id: number) {
        return this.productService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'edit product by id' })
    @ApiOkResponse({ description: 'product edited' })
    @ApiNotFoundResponse({ description: 'product not found' })
    @ApiBadRequestResponse({ description: 'error on edit product' })
    put(@Body() product: UpdateProduct, @Param('id') id: number) {
        return this.productService.edit(id, product);
    }

    // @Delete(':id')
    // delete(@Param('id') id: number) {
    //     return this.productService.remove(id);
    // }

    @Post(':id_stoke')
    @ApiOperation({ summary: 'create product  ' })
    @ApiCreatedResponse({ description: 'product created' })
    @ApiBadRequestResponse({ description: 'error on create product' })
    @UsePipes(ValidationPipe)
    post(@Body() createProduct: CreateProduct,
        @Param('id_stoke') id_stoke: number) {
        const product = this.productService.create(createProduct, id_stoke)
        return product
    }
}


