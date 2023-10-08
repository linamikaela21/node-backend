import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { orderBy, uniq } from 'lodash/fp';
import { SequencyService } from '../services/sequency.service';
import mongoose from 'mongoose';
import { Code, ObjectId } from 'mongodb';
import { Sequency } from '../entity/sequency.entity';
import { AuthGuard } from '@nestjs/passport';
import { isArray } from 'lodash';
import { SequencySchema } from '../schemas/sequency.schema';

@Controller('sequencies')
@UseGuards(AuthGuard('jwt'))
export class SequencyController {
  constructor(private sequencyService: SequencyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getSequences() {
    try {
      const sequencies: Sequency[] = await this.sequencyService.getSequences();
      if (!sequencies) return [];
      return sequencies.map(({ subSequences }) => {
        const originalSequency = uniq(subSequences.flat());
        return {
          sequence: originalSequency,
          subSequences,
        };
      });
    } catch (error) {
      HttpCode(HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSubsequence(@Body() sequence: number[]) {
    if (!isArray(sequence)) return 'Sequence should be an array';
    if (!sequence.length) return 'Sequence should not be empty';
    let subsequences: number[][] = [[]];
    for (const id of sequence) {
      if (id < 0) return 'Id numbers of the sequency should be positive';
      const currentSubsequences: number[][] = [];
      for (const subsequence of subsequences) {
        const newSubsequence = [...subsequence, id];
        if (newSubsequence.length > 0) {
          currentSubsequences.push(newSubsequence);
        }
      }
      subsequences = [...subsequences, ...currentSubsequences];
    }
    const orderSubsequences = orderBy(
      ['length'],
      ['asc'],
      subsequences.filter(subsequence => subsequence.length > 0),
    );

    try {
      const Sequency = mongoose.model('sequency', SequencySchema);

      const newSequence = new Sequency({
        _id: new ObjectId(),
        createdAt: new Date().toLocaleString(),
        subSequences: orderSubsequences,
      });

      return await this.sequencyService.saveSequency(newSequence);
    } catch (error) {
      return HttpCode(HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
