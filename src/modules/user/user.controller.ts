import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/User.dto';
import { AuthGuard } from 'src/guards/authanticantion.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('jwt')
  async test(@Body() dto: any) {
    console.log(dto);
    return this.userService.test(dto);
  }

  @Get('jwt')
  @UseGuards(AuthGuard)
  async guardCheck() {
    return 'test';
  }
}
