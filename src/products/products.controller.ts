import { Controller, Get, Post, Param, Put, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateProduct, CreateProduct } from './dto/products.dto';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';


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

    @Get('/disponible/')
    getDisponible(){
        return this.productService.findDisponible();
    }

    @Get('/disponible/:id')
    getDisponibleById(@Param('id') id: number){
        return this.productService.findDisponibleById(id);
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.productService.findById(id);
    }    
    
    @Put(':id')
    put(@Body() product: UpdateProduct, @Param('id') id: number) {
        return this.productService.edit(id, product);
    }

    // @Delete(':id')
    // delete(@Param('id') id: number) {
    //     return this.productService.remove(id);
    // }

    @Post(':id_stoke')
    @UsePipes(ValidationPipe)
    post(@Body() createProduct:CreateProduct, @Param('id_stoke') idStoke: number){
        const product = this.productService.create(createProduct, idStoke)
        return product
    }
}


