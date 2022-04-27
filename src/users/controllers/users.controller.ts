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
import { ParseIntPipe } from '../../shared/parse-int.pipe';
import { User, NewUser, UpdateUser } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0): User[] {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return this.usersService.getAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto): User {
    // return {
    //   mensaje: 'creado paps',
    //   payload: payload,
    // };
    return this.usersService.createUser(payload);
  }

  @Get('/:userId')
  getOne(@Param('userId', ParseIntPipe) userId: User['id']): User {
    //return `Estas en el producto ${productId}`;
    return this.usersService.getOne(userId);
  }

  @Put('/:userId')
  update(
    @Param('userId', ParseIntPipe) userId: User['id'],
    @Body() payload: UpdateUserDto,
  ): User {
    // return {
    //   mensaje: 'actualizado paps',
    //   payload: payload,
    // };
    return this.usersService.updateUser(userId, payload);
  }
  @Delete('/:userId')
  delete(@Param('userId', ParseIntPipe) userId: User['id']): User {
    // return {
    //   mensaje: 'eliminado paps',
    //   productId: productId,
    // };
    return this.usersService.deleteUser(userId);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: User['id']) {
    return this.usersService.getOrdersByUser(id);
  }
}
