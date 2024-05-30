import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true })
  book: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parentComment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
