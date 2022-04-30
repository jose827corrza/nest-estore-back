import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *
   *  El orden es muy importante en cuanto a las rutas, osea las rutas
   *  dinamicas se deben de declarar al final, luego de todas las estaticas para evitar errores
   */

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
