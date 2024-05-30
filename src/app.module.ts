import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/mongo.mode';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CommentModule } from './modules/comment/comment.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { NotificationModule } from './modules/notification/notification.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    DatabaseModule,

    UserModule,
    CommentModule,
    FavoriteModule,
    UserSettingsModule,
    NotificationModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
