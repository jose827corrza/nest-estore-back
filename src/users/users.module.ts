import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './services/users.service';
import { ProductsModule } from './../products/products.module';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { User, UserSchema } from './entities/user.entity';

@Module({
  //imports: [ProductsModule],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
  exports: [UsersService],
})
export class UsersModule {}
