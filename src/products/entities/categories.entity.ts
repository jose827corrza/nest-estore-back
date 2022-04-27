import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    description: 'Auto-generated Id for the category',
  })
  id: number;
  @ApiProperty({
    description: 'Name of the category',
  })
  name: string;
  @ApiProperty({
    description: "List of url's for category images",
  })
  image: string[];
}

export interface NewCategory extends Omit<Category, 'id'> {}

export interface UpdateCategory extends Partial<Category> {}
