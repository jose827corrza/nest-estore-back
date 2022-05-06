import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Category } from '../entities/categories.entity';
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  //private categories: Category[] = [];

  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(params?: FilterCategoryDto) {
    return await this.categoryModel.find().exec();
  }

  async findOne(categoryId: string) {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException(
        `No existe esta categoria con ID: ${categoryId}`,
      );
    } else {
      return category;
    }
  }

  create(data: CreateCategoryDto) {
    const newCategory: Category = new this.categoryModel(data);
    return newCategory.save();
  }

  async update(categoryId: string, changes: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      categoryId,
      { $set: changes },
      { new: true },
    );
    if (!category) {
      throw new NotFoundException(
        `No existe la categoria con ID:${categoryId}`,
      );
    }
    return category;
  }

  async delete(categoryId: string) {
    return await this.categoryModel.findByIdAndDelete(categoryId);
  }
}
