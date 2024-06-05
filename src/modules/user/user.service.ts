import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schema/User.Schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/User.dto';
import { UserSettings } from 'src/Schema/UserSettings.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Corrected import
import { AuthResponse } from './user.interfaces';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(UserSettings.name)
    private UserSettingsModel: Model<UserSettings>,
    private jwtService: JwtService,
  ) {}

  private async hasUser(email: string): Promise<boolean> {
    let user = await this.UserModel.countDocuments({ email });
    return !!user;
  }

  private async generateJwt(id: Types.ObjectId): Promise<string> {
    const payload = { id };
    return await this.jwtService.signAsync(payload);
  }

  async signUp(userDto: CreateUserDto): Promise<AuthResponse> {
    try {
      const userExist = await this.hasUser(userDto.email);
      if (userExist) {
        throw new HttpException(
          'Email address is already used',
          HttpStatus.CONFLICT,
        );
      }

      const newSettings = new this.UserSettingsModel();
      await newSettings.save();

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(userDto.password, salt);

      const newUser = new this.UserModel({
        ...userDto,
        passwordHash,
        settings: newSettings._id,
      });
      await newUser.save();

      const user = await this.UserModel.findOne({ email: userDto.email })
        .select('-passwordHash')
        .lean();

      const jwt = await this.generateJwt(newUser._id);

      return { user, jwt };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(userDto: any): Promise<AuthResponse> {
    const userExist = await this.hasUser(userDto.email);

    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    const user = await this.UserModel.findOne({
      email: userDto.email,
    }).populate('settings');

    const isValidPass = await bcrypt.compare(
      userDto.password,
      user.passwordHash,
    );
    if (!isValidPass) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const { passwordHash, ...userWithoutPasswordHash } = user.toObject(); // Convert Mongoose document to plain object

    const jwt = await this.generateJwt(user._id);
    return { user: userWithoutPasswordHash, jwt };
  }

  async auth(req: Request) {
    try {
      const id = req.user.id;

      const user = await this.UserModel.findOne({
        _id: req.user.id,
      }).populate('settings');

      if (!user) {
        throw new UnauthorizedException('Incorrect email or password.');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Server Errors');
    }
  }
}
