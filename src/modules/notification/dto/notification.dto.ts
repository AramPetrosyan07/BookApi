import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsOptional()
  sender?: string;

  @IsOptional()
  receiver?: string;

  @IsOptional()
  book?: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
