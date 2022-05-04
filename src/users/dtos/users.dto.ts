import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsNumber,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { Roles } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "User's email related to new account" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User's name" })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "User's password" })
  password: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role of the user',
    enum: ['administrator', 'developer', 'customer'],
  })
  role: Roles;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "User's avatar" })
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
