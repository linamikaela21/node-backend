import { Body, HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Sequency } from '../entity/sequency.entity';
import { SequencyDto } from '../dto/sequency.dto';

@Injectable()
export class SequencyService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  async getSequences(): Promise<Sequency[]> {
    const connect = await this.databaseService.getConnection();
    const db = connect.db;
    const sequencies = await db
      .collection<Sequency>('sequencies')
      .find()
      .sort({ $natural: -1 })
      .limit(10)
      .toArray();
    return sequencies;
  }

  @HttpCode(HttpStatus.CREATED)
  async saveSequency(@Body() sequencyDto: SequencyDto) {
    const connect = await this.databaseService.getConnection();
    const db = connect.db;
    await db.collection('sequencies').insertOne(sequencyDto);
    return `New sequency created successfully - ${sequencyDto.createdAt}`;
  }
}
