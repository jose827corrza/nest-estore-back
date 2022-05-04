import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoClient } from 'mongodb';
import projectConfig from './../config';

@Global()
@Module({
  imports: [
    //esta forma deja todo explicito :c
    // MongooseModule.forRoot('mongodb://localhost:27017', {
    //   user: 'root',
    //   pass: 'root',
    //   dbName: 'jose-store',
    // }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof projectConfig>) => {
        const { connection, dbName, dbPassword, dbUser, host, port } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user: dbUser,
          pass: dbPassword,
          dbName,
        };
      },
      inject: [projectConfig.KEY],
    }),
  ],
  providers: [
    // {
    //   provide: 'API_KEY',
    //   useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    // },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof projectConfig>) => {
        const { connection, dbName, dbPassword, dbUser, host, port } =
          configService.mongo;
        const URI = `${connection}://${dbUser}:${dbPassword}@${host}:${port}/?authMechanism=DEFAULT`;
        //const URI =
        //  'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(URI);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [projectConfig.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
