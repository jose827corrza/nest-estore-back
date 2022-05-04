import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { Document } from 'mongoose';

export enum Roles {
  administrator = 'administrator',
  developer = 'developer',
  customer = 'customer',
}

@Schema()
export class User extends Document {
  @ApiProperty({
    description: "User's email",
  })
  @Prop({ required: true, type: String })
  email: string;

  @ApiProperty({
    description: 'Name of the user',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'Name of the user',
    enum: ['administrator', 'developer', 'customer'],
  })
  @Prop()
  role: Roles;

  @ApiProperty({
    description: 'Avatar of the user',
  })
  @Prop()
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// export interface NewUser extends Omit<User, 'id'> {}

// export interface UpdateUser extends Partial<User> {}
