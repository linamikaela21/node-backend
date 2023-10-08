import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async getAuth(@Res() res: Response) {
    try {
      const accessToken = await this.authService.getToken();
      return res.status(HttpStatus.OK).send({
        message: 'Token Created Successfully',
        token: accessToken,
      });
    } catch (error) {
      HttpCode(HttpStatus.BAD_REQUEST);
    }
  }
}
