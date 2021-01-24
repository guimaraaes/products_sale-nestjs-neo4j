import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { StaffService } from './staff.service';


@ApiTags('stokes')
@Controller('staff')
export class StaffController {
    constructor(
        private readonly serviceStaff: StaffService
    ) { }

    @Get(':id_stoke')
    @ApiOperation({ summary: 'get all staffs by id stoke' })
    @ApiOkResponse({ description: 'staffs found' })
    @ApiNotFoundResponse({ description: 'no staff found' })
    getAll(@Param('id_stoke') id_stoke: number) {
        return this.serviceStaff.findAll(id_stoke)
    }

    // @Post()
    // post(@Body() createStaff: CreateStaff) {
    //     return this.serviceStaff.create(createStaff)
    // }

    @Get(':id')
    @ApiOperation({ summary: 'get staff by id' })
    @ApiOkResponse({ description: 'staff found' })
    @ApiNotFoundResponse({ description: 'staff not found' })
    getById(@Param('id') id: number) {
        return this.serviceStaff.findById(id)
    }
}
