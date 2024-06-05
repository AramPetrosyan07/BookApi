import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from 'src/Schema/Book.schema';
import { Model } from 'mongoose';
import { IbookCount } from './book.interfaces';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<Book>) {}

  async getBooks(dto: IbookCount) {
    if (dto.from > dto.to) {
      throw new UnauthorizedException('Invalid count of books');
    }

    const books = await this.BookModel.find()
      .sort({ postedDate: -1 }) // Sort by postedDate in descending order
      .skip(dto.from)
      .limit(dto.to - dto.from)
      .exec();

    return books;
  }
}
