import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import config from '../../../config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async getToken() {
    const secret = this.configService.jwt.secret;
    const expiresIn = this.configService.jwt.expiresIn;

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        { message: 'Log Successfully' },
        {
          secret,
          expiresIn,
        },
      ),
    ]);
    return accessToken;
  }
}
