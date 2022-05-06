import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
import {
  CreateOrderDto,
  UpdateOrderDto,
  AddProductsToOrderDto,
} from '../dtos/orders.dto';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Get a list of all the orders',
    description: 'Obtains all the orders from the DB',
  })
  async getAll() {
    return await this.orderService.getAll();
  }

  @Get('/:orderId')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Get info of the order',
    description: 'Obtains info of the order from the DB',
  })
  async getOne(@Param('orderId', MongoIdPipe) orderId: string) {
    return await this.orderService.getOne(orderId);
  }

  @Post('/')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Creates an order',
    description: 'Saves a new order in the DB',
  })
  async create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Put('/:orderId')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Updates an order',
    description: 'Updates an order in the DB',
  })
  async update(
    @Body() payload: UpdateOrderDto,
    @Param('orderId', MongoIdPipe) orderId: string,
  ) {
    return await this.orderService.update(orderId, payload);
  }
  @Delete('/:orderId')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Deletes an order',
    description: 'Removes an order from the DB',
  })
  async delete(@Param('orderId') orderId: string) {
    return await this.orderService.remove(orderId);
  }

  @Put('/:id/products')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Add a product to the order',
    description: 'Push a new product to the array of the products of an order',
  })
  async addProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto,
  ) {
    return await this.orderService.addProducts(id, payload.productsIds);
  }

  @Delete('/:id/product/:productId')
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Deletes a product from the order',
    description: 'Removes a product from order saved the DB',
  })
  async removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return await this.orderService.removeProducts(id, productId);
  }
}
