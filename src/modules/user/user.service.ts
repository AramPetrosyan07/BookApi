import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schema/User.Schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/User.dto';
import { UserSettings } from 'src/Schema/UserSettings.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserSettings.name)
    private UserSettingsModel: Model<UserSettings>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    try {
      let hasUser = await this.UserModel.countDocuments({
        email: userDto.email,
      });
      if (hasUser) {
        throw new HttpException(
          'Email addres is alreadi used',
          HttpStatus.CONFLICT,
        );
      }
      const newSettings = new this.UserSettingsModel();
      await newSettings.save();

      const newUser = new this.UserModel({
        ...userDto,
        settings: newSettings._id,
      });
      await newUser.save();
      console.log(newUser);

      return this.UserModel.find().populate('settings');
    } catch (err) {
      console.log('---------------error---------------');
      console.log(err);
    }
  }

  async test(dto: any) {
    const payload = { id: dto.userId, username: dto.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
