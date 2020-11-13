import { Module } from '@nestjs/common';
import { StokesService } from './stokes.service';
import { StokesController } from './stokes.controller';

@Module({
    controllers: [StokesController],
    providers: [StokesService],
})
export class StokesModule {}
