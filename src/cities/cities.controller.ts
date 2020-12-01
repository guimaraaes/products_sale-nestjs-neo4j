import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CityService } from './cities.service';

@ApiTags('utils')
@Controller('city')
export class CityController {
    constructor(
        private readonly serviceCity: CityService
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all cities' })
    @ApiOkResponse({ description: 'cities found' })
    @ApiNotFoundResponse({ description: 'no city found' })
    getAll() {
        return this.serviceCity.findAll()
    }

}
