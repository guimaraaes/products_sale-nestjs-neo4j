import { Controller, Get, Post, Param, Put, Delete, Res, Body, HttpStatus, Module, Injectable} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response } from 'express';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Neo4jController } from '../neo4j/neo4j.controller'
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { Neo4jModule } from 'src/neo4j/neo4j.module';

// @Injectable()
// @Module({
//       providers:[Neo4jService]
// })
@ApiTags('products')
@Controller('products')
export class ProductsController {
    // constructor(private neo4jService: Neo4jService) {}
    @Get()
    findAll(): number{
        // console.log('sd')
        
        return 1;
    }
    @Get('neo4j')
    async getHello(): Promise<any> {
        // const a = this.neo4jService.g()
        // const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)
        return ` nodes in the database`
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


