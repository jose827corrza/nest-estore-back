import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Product extends Document {
  //Este ID se encarga mongo de proporionarlo
  // id: number;
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// export interface NewProduct extends Omit<Product, 'id'> {}

// export interface UpdateProduct extends Partial<Product> {}
