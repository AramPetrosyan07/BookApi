import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { bookCount } from './dto/book.dto';
import { AuthGuard } from 'src/guards/authanticantion.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('get')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async getBooks(@Body() dto: bookCount) {
    return this.booksService.getBooks(dto);
  }
}
