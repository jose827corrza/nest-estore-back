import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { Product } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Order extends Document {
  @ApiProperty({ description: 'Date of cration of the order' })
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  @ApiProperty({
    description: 'Customer info which the order belongs',
    type: Customer,
  })
  customer: Customer | Types.ObjectId;
  //Asi esta embebido

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  @ApiProperty({ description: 'Product that contains the order' })
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
