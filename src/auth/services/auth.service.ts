import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getToken() {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        { login: 'Success' },
        {
          secret: this.configService.get<string>('JWT'),
          expiresIn: '10m',
        },
      ),
    ]);

    return {
      accessToken,
    };
  }
}
