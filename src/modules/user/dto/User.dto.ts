import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  settings?: string;

  @IsOptional()
  @IsArray()
  readLater: string[];

  @IsOptional()
  @IsArray()
  alreadyRead: string[];

  @IsOptional()
  @IsArray()
  favorite: string[];

  @IsOptional()
  @IsArray()
  notification: string[];
}
