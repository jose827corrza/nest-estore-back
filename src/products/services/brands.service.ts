import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brands.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  getAll(): Brand[] {
    return this.brands;
  }

  getOne(brandId: Brand['id']): Brand {
    return this.brands.find((brand) => brand.id === brandId);
  }

  update(brandId: Brand['id'], changes: UpdateBrandDto): Brand {
    const brand = this.getOne(brandId);
    const index = this.brands.findIndex((brand) => brand.id === brandId);
    this.brands[index] = {
      ...brand,
      ...changes,
    };
    return this.brands[index];
  }

  delete(brandId: Brand['id']): Brand {
    const brand = this.getOne(brandId);
    const index = this.brands.findIndex((brand) => brand.id === brandId);
    this.brands.splice(index, 1);
    return brand;
  }

  create(data: CreateBrandDto): Brand {
    const newBrand = {
      id: randomInt(4),
      ...data,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
}
