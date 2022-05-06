import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {

  @ApiProperty({
    description: 'Name of the brand',
  })
  @Prop({ required: true, type: String, unique: true })
  name: string;

  @ApiProperty({
    description: 'Imgs for the brand',
  })
  @Prop({ required: true, type: String })
  image: string[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
// export interface NewBrand extends Omit<Brand, 'id'> {}

// export interface UpdateBrand extends Partial<Brand> {}
