import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ alias: 'publication_year' })
  publicationYear: string;

  @Prop()
  publisher: string;

  @Prop({ alias: 'image_url_s' })
  imageSmall: string;

  @Prop({ alias: 'image_url_m' })
  imageMedium: string;

  @Prop({ alias: 'image_url_l' })
  imageLarge: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
