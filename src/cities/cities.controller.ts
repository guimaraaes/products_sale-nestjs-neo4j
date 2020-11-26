import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityService } from './cities.service';

@ApiTags('utils')
@Controller('city')
export class CityController {
    constructor(
        private readonly serviceCity: CityService
    ) { }

    @Get()
    getAll() {
        return this.serviceCity.findAll()
    }

}
