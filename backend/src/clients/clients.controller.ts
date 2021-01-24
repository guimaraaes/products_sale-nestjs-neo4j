import { Controller, Get, Param, Post, Put, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { UpdateClient, CreateClient } from './dto/clients.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor(
        private readonly clientsService: ClientsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all clients' })
    @ApiOkResponse({ description: 'clients found' })
    @ApiNotFoundResponse({ description: 'no client found' })
    getAll() {
        return this.clientsService.findAll();
    }

    @Post()
    @Post(':id_stoke')
    @ApiOperation({ summary: 'create client' })
    @ApiCreatedResponse({ description: 'client created' })
    @ApiBadRequestResponse({ description: 'error on create client' })
    @UsePipes(ValidationPipe)
    post(@Body() createClient: CreateClient) {
        return this.clientsService.create(createClient)
    }

    @Get(':id')
    @ApiOperation({ summary: 'get client by id' })
    @ApiOkResponse({ description: 'client found' })
    @ApiNotFoundResponse({ description: 'client not found' })
    getById(@Param('id') id: number) {
        return this.clientsService.findById(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'edit client by id' })
    @ApiOkResponse({ description: 'client edited' })
    @ApiNotFoundResponse({ description: 'client not found' })
    @ApiBadRequestResponse({ description: 'error on edit client' })
    @UsePipes(ValidationPipe)
    put(@Param('id') id: number, @Body() updateClientDTO: UpdateClient) {
        return this.clientsService.edit(id, updateClientDTO)
    }


    @Get(':id/getsales/')
    @ApiOperation({ summary: 'get sales from client by id' })
    @ApiOkResponse({ description: 'sales client found' })
    @ApiNotFoundResponse({ description: 'sales client not found | client not found' })
    getAllSales(@Param('id') id: number) {
        return this.clientsService.findSales(id);
    }

    @Get(':id/getproducts')
    @ApiOperation({ summary: 'get products from client by id' })
    @ApiOkResponse({ description: 'products client found' })
    @ApiNotFoundResponse({ description: 'products client not found | client not found' })
    getProducts(@Param('id') id: number) {
        return this.clientsService.findProducts(id);
    }

}
