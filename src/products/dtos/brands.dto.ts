import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsUrl()
  image: string[];
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
