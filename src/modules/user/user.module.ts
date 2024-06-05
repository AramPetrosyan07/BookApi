// user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.Schema';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/Schema/UserSettings.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
    AuthModule, // Use AuthModule to get JWT functionality
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
