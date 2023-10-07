import { Global, Module } from '@nestjs/common';
import { SequencyService } from './services/sequency.service';
import { SequencyController } from './controllers/sequency.controller';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../auth/controllers/auth.controller';

@Global()
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [SequencyController, AuthController],
  providers: [SequencyService, DatabaseService, AuthService, JwtService],
})
export class SequencyModule {}
