import { Global, Module } from '@nestjs/common';
import { SequencyService } from './services/sequency.service';
import { SequencyController } from './controllers/sequency.controller';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [SequencyController],
  providers: [SequencyService, DatabaseService],
})
export class SequencyModule {}
