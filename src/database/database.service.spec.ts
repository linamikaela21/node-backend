import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { DatabaseService } from './database.service';
import config from '../../config';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: config.KEY,
          useValue: {
            database: {
              port: 27017,
              host: 'localhost',
              name: 'test-db',
            },
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    connection = service.getConnection();
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a connection to the database', async () => {
    expect(connection.readyState).toEqual(2);
  });

  it('should return a connection to the database', async () => {
    expect(service.getConnection()).toEqual(connection);
  });
});
