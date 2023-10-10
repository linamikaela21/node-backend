import { ApiProperty } from '@nestjs/swagger';

export class SequenceDto {
  @ApiProperty({ default: new Date().toISOString() })
  createdAt: string;
  @ApiProperty({ required: true, default: [] })
  subSequences: number[][];
}

export class GetSequenceDto {
  @ApiProperty({ required: true, default: [] })
  sequence: number[];
  @ApiProperty({ required: true, default: [] })
  subSequences: number[][];
}
