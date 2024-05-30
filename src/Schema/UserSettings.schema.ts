import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

@Schema({ timestamps: true })
export class UserSettings {
  @Prop({
    type: String,
    enum: ThemeMode,
    default: ThemeMode.SYSTEM,
  })
  mode: ThemeMode;

  @Prop({ type: Boolean, default: true })
  isNotificationEnabled: boolean;

  @Prop({ default: 'en' })
  language: string;
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
