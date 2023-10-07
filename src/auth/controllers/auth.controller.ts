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
      if (accessToken) {
        return res.send({
          message: 'You already have Bearer token',
          token: accessToken,
        });
      }
      return res.status(HttpStatus.OK).send({
        message: 'Token Added Successfully',
        token: accessToken,
      });
    } catch (error) {
      HttpCode(HttpStatus.BAD_REQUEST);
    }
  }
}
