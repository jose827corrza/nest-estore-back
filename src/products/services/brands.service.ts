import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { timeStamp } from 'console';

import { Model } from 'mongoose';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';
import { Brand } from '../entities/brands.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async getAll(params?: FilterBrandDto) {
    return await this.brandModel.find().exec();
  }

  async getOne(brandId: string) {
    const brand = await this.brandModel.findById(brandId).exec();
    if (!brand) {
      throw new NotFoundException(`No existe esta marca con ID: ${brandId}`);
    } else {
      return brand;
    }
  }

  async update(brandId: string, changes: UpdateBrandDto) {
    const brand = await this.brandModel.findByIdAndUpdate(
      brandId,
      { $set: changes },
      { new: true },
    );
    if (!brand) {
      throw new NotFoundException(`No existe una marca con ID:${brandId}`);
    }
    return brand;
  }

  async delete(brandId: string) {
    return await this.brandModel.findByIdAndDelete(brandId);
  }

  create(data: CreateBrandDto) {
    const newBrand: Brand = new this.brandModel(data);
    return newBrand.save();
  }
}
