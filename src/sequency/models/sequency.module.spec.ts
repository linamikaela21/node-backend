import { Test, TestingModule } from '@nestjs/testing';
import { SequencyModule } from './sequency.module';
import { SequencyService } from '../services/sequency.service';
import { DatabaseService } from '../../database/database.service';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('SequencyModule', () => {
  let sequencyModule: SequencyModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SequencyModule],
      providers: [SequencyService, DatabaseService, AuthService, JwtService],
    }).compile();

    sequencyModule = app.get<SequencyModule>(SequencyModule);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(sequencyModule).toBeDefined();
    });
  });
});
