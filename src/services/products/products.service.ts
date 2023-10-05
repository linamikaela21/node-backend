import { Injectable } from '@nestjs/common';
import { Product } from '../../models/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Products 1',
      price: 12,
    },
  ];

  findAll() {
    return this.products;
  }
}
