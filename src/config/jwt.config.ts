import { ConfigService } from '@nestjs/config';

export class CustomJwtConfig {
  static jwtSecret(configService: ConfigService): string {
    const jwtSecret = configService.get<string>('JWT') || 'secret';
    console.log('JWT Secret:', jwtSecret); // Add this line
    return jwtSecret;
  }
}
