import { ConfigService } from '@nestjs/config';

export class CustomJwtConfig {
  static jwtSecret(configService: ConfigService): string {
    const jwt = configService.get<string>('JWT') || 'secret';
    console.log('JWT Secret:', jwt); // Add this line
    return jwt;
  }
}

// export class CustomBcryptConfig {
//   static bcryptSecret(configService: ConfigService): string {
//     const Secret = configService.get<string>('BCRYPT') || 'secret';
//     console.log('JWT Secret:', jwtSecret); // Add this line
//     return jwtSecret;
//   }
// }
