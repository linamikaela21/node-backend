import { Test } from '@nestjs/testing';
import { DatabaseService } from '../../database/database.service';
import { SequencyService } from './sequency.service';

describe('SequencyService', () => {
  describe('SequencyService', () => {
    let service: SequencyService;

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

      service = module.get<SequencyService>(SequencyService);
    });

    describe('getSequences', () => {
      it('should be defined', () => {
        expect(service).toBeDefined();
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

      it('should save a sequency and return the saved sequency', async () => {
        jest
          .spyOn(service, 'saveSequency')
          .mockResolvedValue('New sequency created successfully');
        jest
          .spyOn(service, 'getSequences')
          .mockResolvedValue(sequencesResponse as any);
        expect(await service.getSequences()).toEqual(sequencesResponse);
        expect(await service.getSequences()).toEqual(sequencesResponse);
      });
    });

    describe('saveSequency', () => {
      it('should be defined', () => {
        expect(service).toBeDefined();
      });

      it('should save a sequency and return the saved sequency', async () => {
        const newSequency = {
          id: '1',
          createdAt: '2021-09-01T00:00:00.000Z',
          subSequences: [[1], [2], [1, 2]],
        };
        jest
          .spyOn(service, 'saveSequency')
          .mockResolvedValue('New sequency created successfully');
        expect(await service.saveSequency(newSequency as any)).toEqual(
          'New sequency created successfully',
        );
      });
    });
  });
});
