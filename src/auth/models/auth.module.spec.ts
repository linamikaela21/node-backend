import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authModule = moduleRef.get<AuthModule>(AuthModule);
  });

  it('should be defined', () => {
    expect(authModule).toBeDefined();
  });
});
