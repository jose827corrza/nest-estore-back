import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

import { Order } from '../entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getAll(): Promise<Order[]> {
    return await this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async getOne(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`No existe esta marca con ID: ${orderId}`);
    } else {
      return order;
    }
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(orderId: string, changes: UpdateOrderDto): Promise<Order> {
    return await this.orderModel
      .findByIdAndUpdate(orderId, { $set: changes }, { new: true })
      .exec();
  }

  async removeProducts(orderId: string, productId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(orderId: string, productsId: string[]): Promise<Order> {
    const order = await this.orderModel.findById(orderId);
    productsId.forEach((id) => order.products.push(productsId));
    return order.save();
  }

  async remove(orderId: string) {
    return await this.orderModel.findByIdAndDelete(orderId);
  }
}
