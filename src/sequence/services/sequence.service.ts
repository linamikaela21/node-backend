import { Body, HttpCode, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Sequence } from '../entity/sequence.entity';

@Injectable()
export class SequenceService {
  constructor(
    @Inject(DatabaseService) private databaseService: DatabaseService,
  ) {}

  @HttpCode(HttpStatus.OK)
  async getSequences(): Promise<Sequence[]> {
    try {
      const connect = this.databaseService.getConnection();
      const db = connect.db;
      const sequencies = await db
        .collection<Sequence>('sequencies')
        .find()
        .sort({ $natural: -1 })
        .limit(10)
        .toArray();
      return sequencies;
    } catch (error) {
      throw new Error('Error getting the sequencies');
    }
  }

  @HttpCode(HttpStatus.CREATED)
  async saveSequence(@Body() sequenceDto: Sequence) {
    try {
      const connect = this.databaseService.getConnection();
      const db = connect.db;
      await db.collection('sequencies').insertOne(sequenceDto);
      return `New sequence created successfully - ${sequenceDto.createdAt}`;
    } catch (error) {
      throw new Error('Error saving the sequence');
    }
  }
}
