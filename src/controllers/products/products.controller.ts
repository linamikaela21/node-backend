import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { orderBy } from 'lodash/fp';
import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  createSubsequence(@Body() sequence: number[]) {
    let subsequences: number[][] = [[]];
    for (const id of sequence) {
      const currentSubsequences: number[][] = [];
      for (const subsequence of subsequences) {
        const newSubsequence = [...subsequence, id];
        if (newSubsequence.length > 0) {
          currentSubsequences.push(newSubsequence);
        }
      }
      subsequences = [...subsequences, ...currentSubsequences];
    }
    subsequences = orderBy(
      ['length'],
      ['asc'],
      subsequences.filter((subsequence) => subsequence.length > 0),
    );
    return { sequence, subsequences };
  }

  @Get()
  getSequence() {
    return this.productService.findAll();
  }
}
