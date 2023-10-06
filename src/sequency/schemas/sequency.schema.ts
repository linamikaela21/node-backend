import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SequencyDocument = HydratedDocument<Sequency>;

@Schema()
export class Sequency {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  createdAt: string;

  @Prop()
  subSequences: number[][];
}

export const SequencySchema = SchemaFactory.createForClass(Sequency);
