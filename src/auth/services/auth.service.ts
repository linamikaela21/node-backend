import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async getToken() {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        { message: 'Log Successfully' },
        {
          secret: 'secret',
          expiresIn: '10m',
        },
      ),
    ]);
    return accessToken;
  }
}
