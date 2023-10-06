import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
