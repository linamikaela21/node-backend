import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
    },
    jwt: {
      secret: process.env.JWT || 'Hola como estas',
    },
  };
});

export const secret = 'Hola soy Lali'