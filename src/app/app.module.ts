import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { SequenceModule } from '../sequence/module/sequence.module';

@Module({
  imports: [SequenceModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
