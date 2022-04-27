import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsPositive,
  IsNumber,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Roles } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
