import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get('/')
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): string {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return `Estas en customers, con limite ${limit}.. y un offset de ${offset}, de brand ${brand}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      mensaje: 'creado paps',
      payload: payload,
    };
  }
  @Get('/:productId')
  getOne(@Param('productId') productId: string): string {
    return `Estas en el producto ${productId}`;
  }

  @Put()
  update(@Body() payload: any) {
    return {
      mensaje: 'actualizado paps',
      payload: payload,
    };
  }
  @Delete()
  delete(@Param('productId') productId: string) {
    return {
      mensaje: 'eliminado paps',
      productId: productId,
    };
  }
}
