import { ApiProperty } from '@nestjs/swagger';

export class GetSequenceDto {
  @ApiProperty({ required: true, default: [] })
  sequence: number[];
  @ApiProperty({ required: true, default: [] })
  subSequences: number[][];
}
