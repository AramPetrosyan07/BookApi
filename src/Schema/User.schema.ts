import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'; // Correct import for mongoose

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  dateOfBirth: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  readLater: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  alreadyRead: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  favorite: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Notification' })
  notification: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
