import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Category } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  findAll() {
    return this.categories;
  }

  findOne(categoryId: Category['id']): Category {
    const category = this.categories.find(
      (category) => category.id === categoryId,
    );
    if (!category) {
      throw new NotFoundException('No existe esta categoria');
    } else {
      return category;
    }
  }

  create(data: CreateCategoryDto): Category {
    const newCategory = {
      id: randomInt(10),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(categoryId: Category['id'], changes: UpdateCategoryDto): Category {
    const index = this.categories.findIndex(
      (category) => categoryId === category.id,
    );
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes,
    };
    return this.categories[index];
  }

  delete(categoryId: Category['id']): Category {
    const index = this.categories.findIndex(
      (category) => categoryId === category.id,
    );
    const deleted = this.categories.splice(index, 1);
    return deleted[0];
  }
}
