import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  //ParseIntPipe --> es es el del framework
} from '@nestjs/common';
import { ParseIntPipe } from '../../shared/parse-int.pipe';
//import { NewProduct, Product } from 'src/models/products.model'; -> Estilo de curso TS
import { Product } from 'src/products/entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/products.dto';
import { ProductsService } from '../../products/services/products.service';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    //return `Estas en productos, con limite ${limit}.. y un offset de ${offset}, de brand ${brand}`;
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }
  @Get('/:productId')
  async getOne(@Param('productId', MongoIdPipe) productId: string) {
    //Con los pipes(ParseIntPipe) confirmamos y transformamos esta clase de valores
    return this.productsService.findOne(productId);
  }

  @Put('/:productId')
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }
  @Delete('/:productId')
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.remove(productId);
  }
}
