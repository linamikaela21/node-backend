import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SequencyModule } from './sequency/sequency.module';

async function bootstrap() {
  const app = await NestFactory.create(SequencyModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
