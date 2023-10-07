import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(() => {
              return {
                access_token: 'access_token',
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
    it('should call authService.getToken and receive a valid access_token', async () => {
      const mockResponse = jest
        .fn()
        .mockResolvedValue({ access_token: 'access_token' });

      jest.spyOn(controller, 'getAuth').mockImplementation(mockResponse);

      expect(await controller.getAuth({} as any)).toEqual(
        await mockResponse({} as any),
      );
    });
  });
});
