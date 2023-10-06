import { Test, TestingModule } from '@nestjs/testing';
import { SequencyService } from './sequency.service';

describe('SequencyService', () => {
  let service: SequencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SequencyService],
    }).compile();

    service = module.get<SequencyService>(SequencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
