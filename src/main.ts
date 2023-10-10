import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Sequence API')
    .setDescription(
      'Sequence API is a simple API to generate subsequences from a sequence of numbers and it is protected with JWT',
    )
    .setVersion('1.0')
    .addTag('Sequence')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Get a token from /auth and paste it here',
        in: 'header',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}

main().catch(err => console.log(err));
