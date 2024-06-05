import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/User.dto';
import { AuthGuard } from 'src/guards/authanticantion.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async guardCheck(@Body() dto: LoginUserDto) {
    return this.userService.signIn(dto);
  }
  @UseGuards(AuthGuard)
  @Get('auth')
  async auth(@Req() req: Request) {
    return this.userService.auth(req);
  }
}
