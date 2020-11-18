import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { CreateStaff } from './dto/staff.dt';


@ApiTags('staff')
@Controller('staff')
export class StaffController{
    constructor(
        private readonly serviceStaff: StaffService
    ){}
    @Get()
    getAll(){
        return this.serviceStaff.findAll()
    }

    @Post()
    post(@Body() createStaff: CreateStaff, @Param('id_stoke') idStoke: number){
        return this.serviceStaff.create(createStaff, idStoke)
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.serviceStaff.getId(id)
    }


}
