import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';
import { Result } from 'neo4j-driver';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('neo')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly neo4jService: Neo4jService
    ) {}

  @Get('neo')
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Get('nodes')
  async nodes(): Promise<any> {
    const res = await this.neo4jService.read(`MATCH (n) RETURN count(n) AS count`)
    return `There are ${res.records[0].get('count')} nodes in the database`
}
 
}
