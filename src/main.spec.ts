import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { SequencyModule } from './sequency/module/sequency.module';
import { INestApplication } from '@nestjs/common';

describe('main', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SequencyModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should start the application', () => {
    expect(app).toBeDefined();
    expect(app.getHttpServer()).toBeDefined();
    expect(app.listen(3000)).toBeDefined();
  });
});
