import { Controller, Get, Post, Put, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityService } from './cities.service';
import { CreateCity } from './dto/cities.dto';

@ApiTags('cities')
@Controller('city')
export class CityController {
    constructor(
        private readonly serviceCity: CityService
    ){}

    @Get()
    getAll(){
        return this.serviceCity.findAll()
    }

    @Post()
    @UsePipes(ValidationPipe)
    post(@Body() createCity: CreateCity){
        return this.serviceCity.create(createCity)
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.serviceCity.getId(id)
    }


}
