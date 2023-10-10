import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { SequenceService } from './sequence.service';

describe('SequenceService', () => {
  let sequenceService: SequenceService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SequenceService,
        {
          provide: DatabaseService,
          useValue: {
            getConnection: jest.fn(),
          },
        },
      ],
    }).compile();

    sequenceService = module.get<SequenceService>(SequenceService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });
  describe('getSequences', () => {
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
    it('should be defined', () => {
      expect(sequenceService).toBeDefined();
    });

    it('should save an array of saved sequencies', async () => {
      jest
        .spyOn(sequenceService, 'saveSequence')
        .mockResolvedValue('New sequence created successfully');
      jest
        .spyOn(sequenceService, 'getSequences')
        .mockResolvedValue(sequencesResponse as any);
      expect(await sequenceService.getSequences()).toEqual(sequencesResponse);
      expect(await sequenceService.getSequences()).toEqual(sequencesResponse);
    });

    it('should throw an error if there is an error getting the sequencies', async () => {
      (databaseService.getConnection as jest.Mock).mockImplementation(() => {
        throw new Error();
      });
      await expect(sequenceService.getSequences()).rejects.toThrowError(
        'Error getting the sequencies',
      );
    });
    it('should return an empty array if there is not sequencies', async () => {
      jest.spyOn(sequenceService, 'getSequences').mockResolvedValue([] as any);
      expect(await sequenceService.getSequences()).toEqual([]);
    });
  });

  describe('saveSequence', () => {
    it('should be defined', () => {
      expect(sequenceService).toBeDefined();
    });

    it('should save a sequence and return New sequence created successfully message', async () => {
      const newSequence = {
        id: '1',
        createdAt: '2021-09-01T00:00:00.000Z',
        subSequences: [[1], [2], [1, 2]],
      };
      jest
        .spyOn(sequenceService, 'saveSequence')
        .mockResolvedValue('New sequence created successfully');
      expect(await sequenceService.saveSequence(newSequence as any)).toEqual(
        'New sequence created successfully',
      );
    });

    it('should throw an error if there is an error saving the sequence', async () => {
      jest
        .spyOn(sequenceService, 'saveSequence')
        .mockRejectedValue(new Error('Error saving the sequence'));
      await expect(
        sequenceService.saveSequence({} as any),
      ).rejects.toThrowError('Error saving the sequence');
    });
  });
});
