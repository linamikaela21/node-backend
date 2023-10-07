import { Test, TestingModule } from '@nestjs/testing';
import { SequencyController } from './sequency.controller';
import { SequencyService } from '../services/sequency.service';

describe('SequencyController', () => {
  let controller: SequencyController;
  let sequencesResponse: any[] = [];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequencyController],
      providers: [
        {
          provide: SequencyService,
          useValue: {
            getSequences: jest.fn(() => sequencesResponse),
            saveSequency: jest.fn(() => 'New sequency created successfully'),
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

    it('should return an empty array if there not sequencies', async () => {
      sequencesResponse = [];
      expect(await controller.getSequences()).toEqual([]);
    });

    it('should return an array with a collection of sequences and subSequences', async () => {
      sequencesResponse = [
        {
          sequence: [1, 2],
          subSequences: [[1], [2], [1, 2]],
        },
        {
          sequence: [1, 2, 3],
          subSequences: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
        },
      ];
      expect(await controller.getSequences()).toEqual(sequencesResponse);
    });
  });

  describe('createSubsequence', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should create a subSequences when receive an array of id in the body', async () => {
      expect(await controller.createSubsequence([1, 2])).toEqual(
        'New sequency created successfully',
      );
    });

    it('should return an error message if some id number in the array is negative', async () => {
      expect(await controller.createSubsequence([1, -2])).toEqual(
        'Id numbers of the sequency should be positive',
      );
    });

    it('should return an error message: Sequence should not be empty if the body is empty', async () => {
      expect(await controller.createSubsequence([])).toEqual(
        'Sequence should not be empty',
      );
    });

    it('should return an error message: Sequence should be an array if the body is not an array', async () => {
      expect(await controller.createSubsequence({} as any)).toEqual(
        'Sequence should be an array',
      );
    });
  });
});
