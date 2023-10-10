import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { orderBy, uniq } from 'lodash/fp';
import { SequenceService } from '../services/sequence.service';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Sequence } from '../entity/sequence.entity';
import { AuthGuard } from '@nestjs/passport';
import { SequenceSchema } from '../schemas/sequence.schema';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetSequenceDto } from '../dto/sequence.dto';
import { Response } from 'express';

@ApiTags('Sequencies')
@Controller('sequencies')
@UseGuards(AuthGuard('jwt'))
export class SequenceController {
  constructor(private sequenceService: SequenceService) {}

  @Get()
  @ApiOperation({ summary: 'Get the last 10 sequencies' })
  @ApiBearerAuth('token')
  @ApiOkResponse({
    description: 'The last 10 sequencies',
    status: HttpStatus.OK,
    type: GetSequenceDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'There are no sequencies',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getSequences(@Res() res: Response) {
    try {
      const sequencies: Sequence[] = await this.sequenceService.getSequences();
      if (!sequencies.length) {
        return res.status(HttpStatus.NO_CONTENT).send({
          message: 'There are no sequencies',
        });
      }
      const sequenciesArray = sequencies.map(({ subSequences }) => {
        const originalSequence = uniq(subSequences.flat());
        return {
          sequence: originalSequence,
          subSequences,
        };
      });
      return res.status(HttpStatus.OK).send(sequenciesArray);
    } catch (error) {
      return HttpCode(HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post()
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a new sequence' })
  @ApiBody({
    description: 'Array of numbers',
    schema: {
      type: 'array',
      items: {
        type: 'integer',
        example: 21,
      },
    },
  })
  @ApiCreatedResponse({ description: 'New sequence created successfully' })
  @ApiBadRequestResponse({
    description: 'Sequence should be an array or Sequence should not be empty',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createSubsequence(@Body() sequence: number[], @Res() res: Response) {
    if (sequence && !sequence.length) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Sequence should an not empty array',
      });
    }
    let subsequences: number[][] = [[]];
    for (const id of sequence) {
      if (id < 0 || !Number.isInteger(id)) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Ids should be positives numbers',
        });
      }
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
      const Sequence = mongoose.model('sequence', SequenceSchema);
      const newSequence = new Sequence({
        _id: new ObjectId(),
        createdAt: new Date().toLocaleString(),
        subSequences: orderSubsequences,
      });

      await this.sequenceService.saveSequence(newSequence);
      res.status(HttpStatus.CREATED).send({
        message: 'New sequence created successfully',
      });
    } catch (error) {
      return HttpCode(HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
