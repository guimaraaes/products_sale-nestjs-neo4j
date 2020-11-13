import { Controller, Get, Param, Post, HttpStatus, Res, Put, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientDTO } from './dto/client.dto';
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

    @Get(':id')
    getById(@Param('id') id: number){
        return this.clientsService.findById(id)
    }

    @Get(':id/getsales/')
    getAllSales(@Param('id') id: number){
        return this.clientsService.findAll();
    }

    // @Get(':id/getsales/:product')
    // getSaleByProduct(@Param('id') id: number, @Param('product') product: string){
    //     return this.clientsService.findAll();
    // }

    @Get(':id/getproducts')
    getProducts(@Param('id') id: number){
        return this.clientsService.findAll();
    }

    @Post()
    post(@Body() createClient: ClientDTO){
        return this.clientsService.create(createClient)
     }

    @Put(':id')
    put(@Param('id') id: number, @Body() updateClientDTO: ClientDTO){
        return this.clientsService.edit(id, updateClientDTO)
    }

}
