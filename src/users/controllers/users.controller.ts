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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  @ApiTags('Users')
  @ApiOperation({
    summary: 'List of users',
    description: 'Returns a list of all the users in the DB',
  })
  async getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<User[]> {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return await this.usersService.getAll();
  }

  @Post('/')
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Creates a new user',
    description: 'Creates a new user which has different roles',
  })
  async create(@Body() payload: CreateUserDto): Promise<User> {
    // return {
    //   mensaje: 'creado paps',
    //   payload: payload,
    // };
    return await this.usersService.createUser(payload);
  }

  @Get('/:userId')
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Gets an user',
    description: 'Obtains the info about an specific user',
  })
  async getOne(@Param('userId', MongoIdPipe) userId: string) {
    //return `Estas en el producto ${productId}`;
    return await this.usersService.getOne(userId);
  }

  @Put('/:userId')
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Updates an user',
    description: 'Updates the info of an user which has different roles',
  })
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
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Deletes an user',
    description: 'deletes an user from the DB',
  })
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
