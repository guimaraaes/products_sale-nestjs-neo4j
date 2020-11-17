import { Module } from '@nestjs/common';
import { CityController } from './cities.controller';
import { CityService } from './cities.service';

@Module({
  controllers: [CityController],
  providers: [CityService]
})
export class CityModule {}
