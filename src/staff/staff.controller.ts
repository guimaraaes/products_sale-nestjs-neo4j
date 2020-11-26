import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { CreateStaff } from './dto/staff.dt';


@ApiTags('stokes')
@Controller('staff')
export class StaffController {
    constructor(
        private readonly serviceStaff: StaffService
    ) { }

    @Get()
    getAll() {
        return this.serviceStaff.findAll()
    }

    @Post()
    post(@Body() createStaff: CreateStaff) {
        return this.serviceStaff.create(createStaff)
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.serviceStaff.findById(id)
    }
}
