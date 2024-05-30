import { IsEnum, IsBoolean, IsString, IsOptional } from 'class-validator';

enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

export class CreateUserSettingsDto {
  @IsOptional()
  @IsEnum(ThemeMode)
  mode: ThemeMode;

  @IsOptional()
  @IsBoolean()
  isNotificationEnabled: boolean;

  @IsOptional()
  @IsString()
  language: string;
}
