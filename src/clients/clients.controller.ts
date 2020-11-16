import { Controller, Get, Param, Post, HttpStatus, Res, Put, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDTO, UpdateClient, CreateClient } from './dto/client.dto';
import { ApiTags } from '@nestjs/swagger';

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

    @Post()
    post(@Body() createClient: CreateClient){
        return this.clientsService.create(createClient)
    }
    
    @Get(':id')
    getById(@Param('id') id: number){
        return this.clientsService.findById(id)
    }

    @Put(':id')
    put(@Param('id') id: number, @Body() updateClientDTO: UpdateClient){
        return this.clientsService.edit(id, updateClientDTO)
    }
    

    @Get(':id/getsales/')
    getAllSales(@Param('id') id: number){
        return this.clientsService.findSales(id);
    }

    @Get(':id/getproducts')
    getProducts(@Param('id') id: number){
        return this.clientsService.findProducts(id);
    }

}
