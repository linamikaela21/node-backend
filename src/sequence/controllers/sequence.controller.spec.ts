import { Test, TestingModule } from '@nestjs/testing';
import { SequenceController } from './sequence.controller';
import { SequenceService } from '../services/sequence.service';
import { HttpStatus } from '@nestjs/common';

describe('SequenceController', () => {
  let controller: SequenceController;
  let service: SequenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SequenceController],
      providers: [
        {
          provide: SequenceService,
          useValue: {
            getSequences: jest.fn(),
            saveSequence: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SequenceController>(SequenceController);
    service = module.get<SequenceService>(SequenceService);
  });

  describe('getSequences', () => {
    it('should return the last 10 sequences', async () => {
      const sequences: any[] = [
        {
          sequence: [1, 2, 3],
          subSequences: [[1], [2], [3], [1, 2], [2, 3], [1, 3], [1, 2, 3]],
        },
        {
          sequence: [4, 5, 6],
          subSequences: [[4], [5], [6], [4, 5], [5, 6], [4, 6], [4, 5, 6]],
        },
      ];
      jest.spyOn(service, 'getSequences').mockResolvedValue(sequences);

      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getSequences(response);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.send).toHaveBeenCalledWith(sequences);
    });

    it('should return no content if there are no sequences', async () => {
      jest.spyOn(service, 'getSequences').mockResolvedValue([]);

      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.getSequences(response);
      expect(response.send).toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith({
        message: 'There are no sequencies',
      });
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
    });

    it('should return service unavailable if there is an error', async () => {
      jest.spyOn(service, 'getSequences').mockRejectedValue(new Error());

      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;

      await controller.getSequences(response);
      expect(response.send).not.toHaveBeenCalled();
    });
  });

  describe('createSubsequence', () => {
    it('should create a new subsequence', async () => {
      const sequence = [1, 2, 3];
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence, response);
      expect(service.saveSequence).toBeCalledWith(
        expect.objectContaining({
          createdAt: new Date().toLocaleString(),
          subSequences: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]],
        }),
      );
      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.send).toHaveBeenCalledWith({
        message: 'New sequence created successfully',
      });
    });

    it('should return bad request if the sequence is empty', async () => {
      const sequence: number[] = [];
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence, response);

      expect(service.saveSequence).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        message: 'Sequence should an not empty array',
      });
    });

    it('should return bad request if the sequence is not an array', async () => {
      const sequence = 1 as any;
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence, response);

      expect(service.saveSequence).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        message: 'Sequence should an not empty array',
      });
    });

    it('should return bad request if the id is not an integer', async () => {
      const sequence = [1.5, 2, 3];
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence, response);

      expect(service.saveSequence).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        message: 'Ids should be positives numbers',
      });
    });

    it('should return bad request if the id is not a number', async () => {
      const sequence = ['1', 2, 3];
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence as any, response);

      expect(service.saveSequence).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        message: 'Ids should be positives numbers',
      });
    });

    it('should return bad request if the sequence contains negative numbers', async () => {
      const sequence = [1, -2, 3];
      const response: any = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await controller.createSubsequence(sequence, response);

      expect(service.saveSequence).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.send).toHaveBeenCalledWith({
        message: 'Ids should be positives numbers',
      });
    });
  });
});
