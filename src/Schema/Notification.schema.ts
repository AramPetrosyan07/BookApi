import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'; // Use * as for proper import

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: string;

  @Prop({ required: true })
  content: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
