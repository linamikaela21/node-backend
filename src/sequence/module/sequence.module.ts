import { Global, Module } from '@nestjs/common';
import { SequenceService } from '../services/sequence.service';
import { SequenceController } from '../controllers/sequence.controller';
import { DatabaseModule } from '../../database/database.module';
import { DatabaseService } from '../../database/database.service';
import { AuthModule } from '../../auth/module/auth.module';
import { AuthService } from '../../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from '../../auth/controllers/auth.controller';

@Global()
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [SequenceController, AuthController],
  providers: [SequenceService, DatabaseService, AuthService, JwtService],
})
export class SequenceModule {}
