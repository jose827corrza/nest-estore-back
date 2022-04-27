export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface NewProduct extends Omit<Product, 'id'> {}

export interface UpdateProduct extends Partial<Product> {}
