import { Test, TestingModule } from '@nestjs/testing';
import { SequencyController } from './sequency.controller';

describe('SequencyController', () => {
  let controller: SequencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequencyController],
    }).compile();

    controller = module.get<SequencyController>(SequencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
