import { Test, TestingModule } from '@nestjs/testing';
import { StokesService } from './stokes.service';

describe('StokesService', () => {
  let service: StokesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StokesService],
    }).compile();

    service = module.get<StokesService>(StokesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
