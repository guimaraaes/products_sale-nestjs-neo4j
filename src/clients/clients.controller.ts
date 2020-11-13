import { Controller, Get, Param, Post, HttpStatus, Res, Put, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
// import { Response } from 'express';
import { ClientDTO } from './dto/client.dto';
import { ApiTags } from '@nestjs/swagger';
// import { runInThisContext } from 'vm';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
        ) {}
 
    @Get()
    getAll(){
        return this.clientsService.findAll();
    }

    @Get('/getsales/')
    getAllSales(@Param('target') target){
        return this.clientsService.findByTarget();
    }

    @Get('getsales/:product')
    getSaleByProduct(@Param('product') product){
        return this.clientsService.findByTarget();
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.clientsService.findById(id)
    }

    @Post()
    post(@Body() createClient: ClientDTO){
        const response = this.clientsService.create(
            createClient.name,
            createClient.cpf,
            createClient.adress
        )
        return response
    }

    @Put(':id')
    put(@Param('id') id: string, @Body() updateClientDTO: ClientDTO){

    }

}
