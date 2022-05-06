import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';
import {
  Product,
  //UpdateProduct,
  //NewProduct,
} from '../entities/products.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from './../dtos/products.dto';
// Se usar mejor el dto para standarizar tanto en controller como en service

@Injectable()
export class ProductsService {
  //private product: Product[] = [];
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductDto): Promise<Product[]> {
    const { limit, offset } = params;
    //return this.product;
    if (params) {
      const { minPrice, maxPrice } = params;
      const filters: FilterQuery<Product> = {};
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return await this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    //Se usa .populate() para cualndo retorne,
    //lo haga con la informacion a la cual esta referencia
    return await this.productModel.find().populate('brand').exec();
  }

  async findOne(productId: string): Promise<Product> {
    //const product = this.product.find((item) => item.id === productId);
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException(`No existe el producto con ID: ${productId}`);
    } else {
      return product;
    }
  }

  create(newProduct: CreateProductDto): Promise<Product> {
    const newData: Product = new this.productModel(newProduct);
    return newData.save();
  }

  async update(productId: string, changes: UpdateProductDto): Promise<Product> {
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

  async remove(productId: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(productId);
  }
}
