import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsPhoneNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Customer's name" })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Customer's lastname" })
  readonly lastName: string;

  @IsPhoneNumber()
  @ApiProperty({ description: "Customer's phone number" })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "Customer's email" })
  readonly email: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "Customer's skills" })
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomerDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
