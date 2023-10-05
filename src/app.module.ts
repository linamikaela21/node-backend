import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [],
  controllers: [AuthController, ProductsController],
  providers: [ProductsService],
})
export class AppModule {}
