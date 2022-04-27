import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import { User, NewUser, UpdateUser } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private productsService: ProductsService,
  ) {}

  private users: User[] = [];
  getAll(): User[] {
    const apyKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apyKey, dbName);

    return this.users;
  }

  getOne(userId: User['id']): User {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new NotFoundException('No existe este usuario');
    } else {
      return user;
    }
  }

  createUser(body: NewUser): User {
    const newUser = {
      id: randomInt(100, 120),
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(userId: User['id'], changes: UpdateUser): User {
    const index = this.users.findIndex((user) => user.id === userId);
    const info = this.users[index];
    this.users[index] = {
      ...info,
      ...changes,
    };
    return this.users[index];
  }

  deleteUser(userId: User['id']): User {
    const index = this.users.findIndex((user) => user.id === userId);
    const info = this.users[index];
    this.users.splice(index, 1);
    return info;
  }

  getOrdersByUser(userId: User['id']): Order {
    const user = this.getOne(userId);
    console.log(user);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
