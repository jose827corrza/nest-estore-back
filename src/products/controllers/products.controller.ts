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
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from '../../products/services/products.service';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): Product[] {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    //return `Estas en productos, con limite ${limit}.. y un offset de ${offset}, de brand ${brand}`;
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto): Product {
    return this.productsService.create(payload);
  }
  @Get('/:productId')
  getOne(@Param('productId', ParseIntPipe) productId: number): Product {
    //Con los pipes(ParseIntPipe) confirmamos y transformamos esta clase de valores
    return this.productsService.findOne(productId);
  }

  @Put('/:productId')
  update(
    @Param('productId', ParseIntPipe) productId: Product['id'],
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }
  @Delete()
  delete(@Param('productId') productId: string) {
    return {
      mensaje: 'eliminado paps',
      productId: productId,
    };
  }
}
