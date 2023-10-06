import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Get()
  async getAuth() {
    const { accessToken } = await this.authService.getToken();
    return accessToken;
  }
}
