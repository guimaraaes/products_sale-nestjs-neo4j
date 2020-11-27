import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';


@ApiTags('stokes')
@Controller('staff')
export class StaffController {
    constructor(
        private readonly serviceStaff: StaffService
    ) { }

    @Get(':id_stoke')
    getAll(@Param('id_stoke') id_stoke: number) {
        return this.serviceStaff.findAll(id_stoke)
    }

    // @Post()
    // post(@Body() createStaff: CreateStaff) {
    //     return this.serviceStaff.create(createStaff)
    // }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.serviceStaff.findById(id)
    }
}
