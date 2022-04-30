import { Injectable, Inject } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config'; bajo tipado
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';
import projectConfig from './config';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    //private config: ConfigService, <-- esta opcion es bajo tipado, grupos pequenos
    @Inject(projectConfig.KEY) private config: ConfigType<typeof projectConfig>,
    @Inject('MONGO') private database: Db,
  ) {}

  getHello(): string {
    //const apiKey = this.config.get<string>('API_KEY'); forma bajo tipado
    //const name = this.config.get<string>('DB_NAME');
    const apiKey = this.config.apiKey;
    const name = this.config.database.name;
    return `Hello World! y la APIKEY es ${apiKey} y db ${name}`;
  }

  getTasks() {
    //sthis.database
    const tasks = this.database.collection('tasks');
    return tasks.find().toArray();
  }
}
