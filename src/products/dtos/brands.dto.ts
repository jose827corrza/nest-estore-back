import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the new brand' })
  readonly name: string;

  @IsUrl()
  @ApiProperty({ description: 'img url array for brand' })
  image: string[];
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class FilterBrandDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
