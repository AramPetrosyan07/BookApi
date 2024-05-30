// database/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // uri: process.env.MONGO,
        uri: configService.get('MONGO'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
