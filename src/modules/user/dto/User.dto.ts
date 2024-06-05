import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsOptional,
  IsDateString,
  MinLength,
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
  password: string;

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

export class signUpUserDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
