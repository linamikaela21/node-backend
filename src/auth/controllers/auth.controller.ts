import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  authentication(@Res() response: Response) {
    const token = '';
    if (!token) {
      throw new UnauthorizedException();
    }
    return response.send({ message: 'Authentic correctly' });
  }
}
