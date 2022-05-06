import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @ApiProperty({
    description: 'Name of the category',
  })
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty({
    description: "List of url's for category images",
  })
  @Prop({ required: true, type: String })
  image: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
// export interface NewCategory extends Omit<Category, 'id'> {}

// export interface UpdateCategory extends Partial<Category> {}
