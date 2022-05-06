import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsNumber,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './../dtos/categories.dto';
import { CreateBrandDto } from './../dtos/brands.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "New product's name" })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "New product's description" })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: "New product's price" })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: "New product's stock in store" })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: "New product's images" })
  readonly image: string;

  /**
   * Esta es una referencia embebida
   */
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({
    description: 'The category which the product belongs',
    type: CreateBrandDto,
  })
  readonly category: CreateCategoryDto;

  /**
   * Referenciada
   */
  @IsNotEmpty()
  @ApiProperty({
    description: 'The brand which the product belongs',
    type: CreateBrandDto,
  })
  @IsMongoId()
  readonly brand: CreateBrandDto;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @Min(0)
  @IsOptional()
  minPrice: number;

  @IsPositive()
  @ValidateIf((param) => param.minPrice)
  maxPrice: number;
}
