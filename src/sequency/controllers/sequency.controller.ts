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
import { SequencySchema } from '../schemas/sequency.schema';
import { ObjectId } from 'mongodb';
import { Sequency } from '../models/sequency.entity';
import { HaveAccessToken } from '../../auth/guards/accessToken.guard';

@UseGuards(HaveAccessToken)
@Controller('sequencies')
export class SequencyController {
  constructor(private sequencyService: SequencyService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSubsequence(@Body() sequence: number[]) {
    let subsequences: number[][] = [[]];
    for (const id of sequence) {
      if (id < 0) return 'Id numbers of the sequency should be positives';
      const currentSubsequences: number[][] = [];
      for (const subsequence of subsequences) {
        const newSubsequence = [...subsequence, id];
        if (newSubsequence.length > 0) {
          currentSubsequences.push(newSubsequence);
        }
      }
      subsequences = [...subsequences, ...currentSubsequences];
    }
    const orderSubsequencies = orderBy(
      ['length'],
      ['asc'],
      subsequences.filter((subsequence) => subsequence.length > 0),
    );

    const Sequency = mongoose.model('sequency', SequencySchema);

    const newSequence = new Sequency({
      _id: new ObjectId(),
      createdAt: new Date().toLocaleString(),
      subSequences: orderSubsequencies,
    });

    return await this.sequencyService.saveSequency(newSequence);
  }

  @UseGuards(HaveAccessToken)
  @Get()
  async getSequencies() {
    const sequencies: Sequency[] = await this.sequencyService.getSequencies();
    if (!sequencies) return [];
    return sequencies.map(({ subSequences }) => {
      const originalSequency = uniq(subSequences.flat());
      return {
        sequence: originalSequency,
        subSequences,
      };
    });
  }
}
