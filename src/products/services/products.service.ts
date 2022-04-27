import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import {
  Product,
  UpdateProduct,
  NewProduct,
} from '../entities/products.entity';
@Injectable()
export class ProductsService {
  private product: Product[] = [];

  findAll() {
    return this.product;
  }

  findOne(productId: Product['id']) {
    const product = this.product.find((item) => item.id === productId);
    if (!product) {
      throw new NotFoundException('No existe este producto');
    } else {
      return product;
    }
  }

  create(newProduct: NewProduct) {
    const newData: Product = {
      id: randomInt(100),
      ...newProduct,
    };
    this.product.push(newData);
    return newData;
  }

  update(productId: Product['id'], changes: UpdateProduct) {
    const index = this.product.findIndex((item) => item.id === productId);
    const product = this.product[index];
    this.product[index] = {
      ...product,
      ...changes,
    };
    return this.product[index];
  }
}
