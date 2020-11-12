import { Module, DynamicModule } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
// const NEO4J_OPTIONS = 'NEO4J_OPTIONS'
// const NEO4J_DRIVER = 'NEO4J_DRIVER'
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.utils'
import { Neo4jConfig } from './interfaces/neo4j-config.interface';
import { Neo4jController } from './neo4j.controller';

export class Neo4jModule {
  static forRoot(config: object): DynamicModule {
      return {
          module: Neo4jModule,
          providers: [
              { 
                  provide: NEO4J_CONFIG,
                  useValue: config
              },
              {
                  // Define a key for injection
                  provide: NEO4J_DRIVER,
                  // Inject NEO4J_OPTIONS defined above as the
                  inject: [NEO4J_CONFIG],
                  // Use the factory function created above to return the driver
                  useFactory: async (config: Neo4jConfig) => createDriver(config)
              },
              Neo4jService,
          ],
        controllers: [Neo4jController],
      }
  }
}