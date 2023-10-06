import { Inject, Injectable } from '@nestjs/common';
import { Connection, createConnection } from 'mongoose';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private dbConnection: Connection;
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    this.createConnectionDB();
  }

  async createConnectionDB() {
    const dbPort = this.configService.database.port;
    const dbHost = this.configService.database.host;
    this.dbConnection = createConnection(
      `mongodb://${dbHost}:${dbPort}/sequencies`,
      {
        monitorCommands: true,
      },
    );

    this.dbConnection.once('open', () => {
      console.log('Connected to MongoDB');
    });
  }

  getConnection(): Connection {
    return this.dbConnection;
  }
}
