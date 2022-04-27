import { Product } from '../../products/entities/products.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({
    description: 'Date when the order is created',
  })
  date: Date;
  @ApiProperty({
    description: 'User which the order belongs',
  })
  user: User;
  @ApiProperty({
    description: "List of products that are in user's order",
  })
  products: Product[];
}
