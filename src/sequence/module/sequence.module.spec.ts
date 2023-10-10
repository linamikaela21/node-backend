import { Test, TestingModule } from '@nestjs/testing';
import { SequenceModule } from './sequence.module';
import { SequenceService } from '../services/sequence.service';
import { DatabaseService } from '../../database/database.service';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('SequenceModule', () => {
  let sequenceModule: SequenceModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SequenceModule],
      providers: [SequenceService, DatabaseService, AuthService, JwtService],
    }).compile();

    sequenceModule = app.get<SequenceModule>(SequenceModule);
  });

  describe('SequenceModule', () => {
    it('should be defined', () => {
      expect(sequenceModule).toBeDefined();
    });
  });
});
