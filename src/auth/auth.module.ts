import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
  ],
  controllers: [],
  providers: [AccessTokenStrategy],
})
export class AuthModule {}
