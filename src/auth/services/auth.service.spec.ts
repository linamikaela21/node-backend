import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import config from '../../../config';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: config.KEY,
          useValue: {
            jwt: {
              secret: 'test-secret',
              expiresIn: '10m',
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getToken', () => {
    it('should return a valid access token', async () => {
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue('test-token');

      const result = await authService.getToken();

      expect(signAsyncSpy).toHaveBeenCalledWith(
        { message: 'Log Successfully' },
        {
          secret: 'test-secret',
          expiresIn: '10m',
        },
      );
      expect(result).toEqual('test-token');
    });
  });
});
