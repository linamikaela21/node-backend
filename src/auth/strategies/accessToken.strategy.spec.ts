import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenStrategy } from './accessToken.strategy';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AccessTokenStrategy', () => {
  let strategy: AccessTokenStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessTokenStrategy],
    }).compile();

    strategy = module.get<AccessTokenStrategy>(AccessTokenStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return the payload if it exists', async () => {
      const payload = { sub: '1234567890', username: 'john.doe' };
      expect(await strategy.validate(payload)).toEqual(payload);
    });

    it('should throw an HttpException with status code 401 if the payload does not exist', async () => {
      const payload = null;
      await expect(strategy.validate(payload)).rejects.toThrow(HttpException);
      await expect(strategy.validate(payload)).rejects.toThrowError(
        new HttpException('Invalid token', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
