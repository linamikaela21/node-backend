import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SequenceDocument = HydratedDocument<Sequence>;

@Schema()
export class Sequence {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  createdAt: string;

  @Prop()
  subSequences: number[][];
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence);
