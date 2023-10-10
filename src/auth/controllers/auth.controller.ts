import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Get a new token' })
  @ApiCreatedResponse({
    description: 'The token was created successfully',
    status: HttpStatus.CREATED,
  })
  async getAuth(@Res() res: Response) {
    try {
      const accessToken = await this.authService.getToken();
      return res.status(HttpStatus.CREATED).send({
        message: 'The token was created successfully',
        token: accessToken,
      });
    } catch (error) {
      HttpCode(HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
