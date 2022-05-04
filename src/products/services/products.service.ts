import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  Product,
  //UpdateProduct,
  //NewProduct,
} from '../entities/products.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';
// Se usar mejor el dto para standarizar tanto en controller como en service

@Injectable()
export class ProductsService {
  //private product: Product[] = [];
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    //return this.product;
    return await this.productModel.find().exec();
  }

  async findOne(productId: string) {
    //const product = this.product.find((item) => item.id === productId);
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(`No existe el producto con ID: ${productId}`);
    } else {
      return product;
    }
  }

  create(newProduct: CreateProductDto) {
    const newData: Product = new this.productModel(newProduct);
    return newData.save();
  }

  async update(productId: string, changes: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      { $set: changes },
      { new: true },
    );
    if (!product) {
      throw new NotFoundException(`No existe el producto con ID: ${productId}`);
    }
    return product;
  }

  async remove(productId: string) {
    return await this.productModel.findByIdAndDelete(productId);
  }
}
