import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';

import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from './../dtos/customers.dto';
import { Customer } from './../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async getAll(params?: FilterCustomerDto) {
    return await this.customerModel.find().exec();
  }

  async getOne(customerId: string) {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException(`No existe el customer con ID:${customerId}`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  async update(customerId: string, changes: UpdateCustomerDto) {
    const customer = await this.customerModel.findByIdAndUpdate(
      customerId,
      { $set: changes },
      { new: true },
    );
    if (!customer) {
      throw new NotFoundException(
        `No existe el producto con ID: ${customerId}`,
      );
    }
    return customer;
  }

  async delete(customerId: string) {
    return await this.customerModel.findByIdAndDelete(customerId);
  }
}
