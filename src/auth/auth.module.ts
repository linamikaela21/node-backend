import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../../config';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
