import { registerAs } from '@nestjs/config';

export default registerAs('projectConfig', () => {
  return {
    database: {
      name: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    mongo: {
      dbName: process.env.MONGO_DB,
      dbUser: process.env.MONGO_INITDB_ROOT_USERNAME,
      dbPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
      port: process.env.MONGO_PORT,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
  };
});
