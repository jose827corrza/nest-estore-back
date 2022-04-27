export class Brand {
  id: number;
  name: string;
  image: string[];
}

export interface NewBrand extends Omit<Brand, 'id'> {}

export interface UpdateBrand extends Partial<Brand> {}
