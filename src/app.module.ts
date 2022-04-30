import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { environments } from './environments';
import { DatabaseModule } from './database/database.module';
import projectConfig from './config';

/**
 * Forma mas facil de realizar la conexion.
 * el "client" debe ser el que entre al Injectable
 */
// async function run() {
//   await client.connect();
//   const database = client.db('jose-store');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();

//Supongamos queremos inyectar la llave para la api en todos nuestros modulos.
const API_KEY = '123456';
const API_KEY_PROD = 'estoy en prod';
//Tambien se puede lograr un dinamismo usando variables de entorno

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [projectConfig],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        //DB_PORT: Joi.string().required(),
        //PORT: Joi.string().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY, // Para ver como se llama desde los servicios revisar el app.service.ts
      provide: 'API_KEY', //Aqui inyecta el valor usando useValue, se inyectara en el modulo APP, en la ruta raiz aparecera la api_key -> localhost:3000
    },
  ],
})
export class AppModule {}
