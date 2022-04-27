import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsUrl()
  image: string[];
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
