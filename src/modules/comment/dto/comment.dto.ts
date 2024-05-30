import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  book: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  author: string;

  @IsOptional()
  parentComment?: string;
}
