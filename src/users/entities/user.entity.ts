export enum Roles {
  administrator = 'administrator',
  developer = 'developer',
  customer = 'customer',
}
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Auto-generated Id for the user',
  })
  id: number;

  @ApiProperty({
    description: "User's email",
  })
  email: string;

  @ApiProperty({
    description: 'Name of the user',
  })
  name: string;
  @ApiProperty({
    description: 'Password of the user',
  })
  password: string;
  @ApiProperty({
    description: 'Name of the user',
    enum: ['administrator', 'developer', 'customer'],
  })
  role: Roles;

  @ApiProperty({
    description: 'Avatar of the user',
  })
  avatar: string;
}

export interface NewUser extends Omit<User, 'id'> {}

export interface UpdateUser extends Partial<User> {}
