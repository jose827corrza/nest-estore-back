import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Brand } from './brands.entity';
import { Category } from './categories.entity';
@Schema()
export class Product extends Document {
  //Este ID se encarga mongo de proporionarlo
  // id: number;
  @Prop({ required: true, type: String })
  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @Prop({ required: false, type: String })
  @ApiProperty({ description: 'Description of the product' })
  description: string;

  @Prop({ required: true, type: Number, index: true })
  @ApiProperty({ description: 'Price of the product' })
  price: number;

  @Prop({ required: true, type: Number })
  @ApiProperty({ description: 'Stock for the product' })
  stock: number;

  @Prop()
  @ApiProperty({ description: 'Images for the product' })
  image: string;
  /**
   * Manera embebida
   */
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  @ApiProperty({
    description: 'Category which the product belongs',
    type: Category,
  })
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  @ApiProperty({ description: "Product's brand", type: Brand })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
// export interface NewProduct extends Omit<Product, 'id'> {}

// export interface UpdateProduct extends Partial<Product> {}
