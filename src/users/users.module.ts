import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ProductsModule } from './../products/products.module';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';

@Module({
  imports: [ProductsModule],
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
})
export class UsersModule {}
