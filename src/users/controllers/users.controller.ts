import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
//import { ParseIntPipe } from '../../shared/parse-int.pipe';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { MongoIdPipe } from './../../shared/mongo-id.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  async getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<User[]> {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return await this.usersService.getAll();
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {
    // return {
    //   mensaje: 'creado paps',
    //   payload: payload,
    // };
    return await this.usersService.createUser(payload);
  }

  @Get('/:userId')
  async getOne(@Param('userId', MongoIdPipe) userId: string) {
    //return `Estas en el producto ${productId}`;
    return await this.usersService.getOne(userId);
  }

  @Put('/:userId')
  async update(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    // return {
    //   mensaje: 'actualizado paps',
    //   payload: payload,
    // };
    return await this.usersService.updateUser(userId, payload);
  }
  @Delete('/:userId')
  async delete(@Param('userId', MongoIdPipe) userId: string): Promise<User> {
    // return {
    //   mensaje: 'eliminado paps',
    //   productId: productId,
    // };
    return await this.usersService.deleteUser(userId);
  }

  // @Get(':id/orders')
  // getOrders(@Param('id') id: string) {
  //   return this.usersService.getOrdersByUser(id);
  // }
}
