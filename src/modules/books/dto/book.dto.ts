import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  publicationYear: string;

  @IsOptional()
  @IsString()
  publisher: string;

  @IsOptional()
  @IsString()
  imageSmall: string;

  @IsOptional()
  @IsString()
  imageMedium: string;

  @IsOptional()
  @IsString()
  imageLarge: string;
}
