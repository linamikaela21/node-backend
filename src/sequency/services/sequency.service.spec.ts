import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { SequencyService } from './sequency.service';

describe('SequencyService', () => {
  let sequencyService: SequencyService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SequencyService,
        {
          provide: DatabaseService,
          useValue: {
            getConnection: jest.fn(),
          },
        },
      ],
    }).compile();

    sequencyService = module.get<SequencyService>(SequencyService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  describe('getSequences', () => {
    it('should be defined', () => {
      expect(sequencyService).toBeDefined();
    });

    const sequencesResponse = [
      {
        id: '1',
        createdAt: '2021-09-01T00:00:00.000Z',
        subSequences: [[1], [2], [1, 2]],
      },
      {
        id: '2',
        createdAt: '2021-08-01T00:00:00.000Z',
        subSequences: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
      },
    ];

    it('should save an array of saved sequencies', async () => {
      jest
        .spyOn(sequencyService, 'saveSequency')
        .mockResolvedValue('New sequency created successfully');
      jest
        .spyOn(sequencyService, 'getSequences')
        .mockResolvedValue(sequencesResponse as any);
      expect(await sequencyService.getSequences()).toEqual(sequencesResponse);
      expect(await sequencyService.getSequences()).toEqual(sequencesResponse);
    });

    it('should throw an error if there is an error getting the sequencies', async () => {
      (databaseService.getConnection as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
      await expect(sequencyService.getSequences()).rejects.toThrowError(
        'Error getting the sequencies',
      );
    });
  });

  describe('saveSequency', () => {
    it('should be defined', () => {
      expect(sequencyService).toBeDefined();
    });

    it('should save a sequency and return the saved sequency', async () => {
      const newSequency = {
        id: '1',
        createdAt: '2021-09-01T00:00:00.000Z',
        subSequences: [[1], [2], [1, 2]],
      };
      jest
        .spyOn(sequencyService, 'saveSequency')
        .mockResolvedValue('New sequency created successfully');
      expect(await sequencyService.saveSequency(newSequency as any)).toEqual(
        'New sequency created successfully',
      );
    });

    it('should throw an error if there is an error saving the sequency', async () => {
      jest
        .spyOn(sequencyService, 'saveSequency')
        .mockRejectedValue(new Error('Error saving the sequency'));
      await expect(
        sequencyService.saveSequency({} as any),
      ).rejects.toThrowError('Error saving the sequency');
    });
  });
});
