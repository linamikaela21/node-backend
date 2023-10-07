import { Test, TestingModule } from '@nestjs/testing';
import { SequencyController } from './sequency.controller';
import { SequencyService } from '../services/sequency.service';

describe('SequencyController', () => {
  let controller: SequencyController;
  const sequencesResponse = [
    {
      sequence: [1, 2],
      subSequences: [[1], [2], [1, 2]],
    },
    {
      sequence: [1, 2, 3],
      subSequences: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequencyController],
      providers: [
        {
          provide: SequencyService,
          useValue: {
            getSequences: jest.fn(() => {
              return sequencesResponse;
            }),
            saveSequency: jest.fn(() => {
              return 'New sequency created successfully';
            }),
          },
        },
      ],
    }).compile();
    controller = module.get<SequencyController>(SequencyController);
  });

  describe('getSequencies', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return an array with a collection of sequences and subSequences', async () => {
      expect(await controller.getSequences()).toEqual(sequencesResponse);
    });
  });

  describe('createSubsequence', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return an array with a collection of subSequences', async () => {
      expect(await controller.createSubsequence([1, 2])).toEqual(
        'New sequency created successfully',
      );
    });
  });
});
