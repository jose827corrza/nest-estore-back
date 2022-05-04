import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './../dtos/users.dto';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    //private configService: ConfigService,
    //private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  //private users: User[] = [];

  async getAll(): Promise<User[]> {
    // const apyKey = this.configService.get('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    // console.log(apyKey, dbName);
    return await this.userModel.find().exec();
    //return this.users;
  }

  async getOne(userId: string): Promise<User> {
    //const user = this.users.find((user) => user.id === userId);
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('No existe este usuario');
    } else {
      return user;
    }
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const user: User = await this.userModel.create(body);
    return user.save();
  }

  async updateUser(userId: string, changes: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: changes },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException(`No existe el producto con ID: ${userId}`);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(userId);
  }

  // async getOrdersByUser(userId: User['id']) {
  //   const user = this.getOne(userId);
  //   console.log(user);

  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
}
