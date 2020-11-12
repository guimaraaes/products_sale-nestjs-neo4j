import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Result } from 'neo4j-driver';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('neo')
@Controller()
export class AppController {
 
}
