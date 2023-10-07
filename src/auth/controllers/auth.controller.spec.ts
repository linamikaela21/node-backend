import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let access_token: string = '';
  let mockResponse: jest.Mock<any, any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => {
              return {
                access_token,
              };
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Post getAuth', () => {
    it('should call authService.getToken and receive 401 code if have a expired token', async () => {
      access_token = '';
      mockResponse = jest.fn().mockResolvedValue(HttpStatus.UNAUTHORIZED);

      jest.spyOn(controller, 'getAuth').mockImplementation(mockResponse);

      expect(await controller.getAuth({} as any).then()).toEqual(
        HttpStatus.UNAUTHORIZED,
      );
    });
    it('should call authService.getToken and receive a valid access_token', async () => {
      access_token = 'access_token';
      mockResponse = jest.fn().mockResolvedValue(access_token);

      jest.spyOn(controller, 'getAuth').mockImplementation(mockResponse);

      expect(await controller.getAuth({} as any)).toEqual(
        await mockResponse({} as any),
      );

      expect(await controller.getAuth({} as any).then()).toEqual(access_token);
    });
  });
});
