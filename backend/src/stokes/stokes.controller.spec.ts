import { Test, TestingModule } from '@nestjs/testing';
import { StokesController } from './stokes.controller';

describe('StokesController', () => {
  let controller: StokesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StokesController],
    }).compile();

    controller = module.get<StokesController>(StokesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
