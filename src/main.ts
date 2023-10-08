import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SequencyModule } from './sequency/module/sequency.module';

async function main() {
  const app = await NestFactory.create(SequencyModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
main();
