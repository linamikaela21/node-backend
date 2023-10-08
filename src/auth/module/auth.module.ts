import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { ConfigModule } from '@nestjs/config';
import config from '../../../config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [AccessTokenStrategy],
})
export class AuthModule {}
