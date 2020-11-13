import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
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

    @Get('/disponible')
    getDisponible(){
        return this.productService.findDisponible();
    }

    @Get(':id')
    getById(@Param('id') id){
        return this.productService.findById(id);
    }

    @Post()
    post(@Body() createProduct:ProductDTO, @Param('id_stoke') idStoke: number){
        const product = this.productService.create(createProduct, idStoke)
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


