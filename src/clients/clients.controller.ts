import { Controller, Get, Param, Post, HttpStatus, Res, Put, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Response } from 'express';
import { UpdateClientDTO } from './dto/update-client.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor(private clientsService: ClientsService) {}

    @Get()
    findAll(): string{
        return 'todos';
    }

    @Get(':target')
    findByTarget(@Param('target') target): string{
        return 'por targetas'
    }

    @Get(':id')
    findById(@Param() params): string{

        return 'encontrar pelo id'
    }

    @Post()
    create(@Res() res: Response){
        res.status(HttpStatus.CREATED).send();
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClientDTO: UpdateClientDTO){

    }

}
