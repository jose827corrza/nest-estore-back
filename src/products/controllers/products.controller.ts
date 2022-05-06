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
import { ApiHeader, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  @ApiTags('Products')
  @ApiOperation({
    summary: 'Gets all the products',
    description: 'Obtains the list of all the products  saved in the DB',
  })
  async getAll(
    // @Query('limit') limit = 10,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterProductDto,
  ) {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    //return `Estas en productos, con limite ${limit}.. y un offset de ${offset}, de brand ${brand}`;
    return this.productsService.findAll(params);
  }

  @Post('/')
  @ApiTags('Products')
  @ApiOperation({
    summary: 'Add a new product',
    description:
      'Creates a new product, which has inhenered references to categories and brands',
  })
  async create(@Body() payload: CreateProductDto) {
    return await this.productsService.create(payload);
  }
  @Get('/:productId')
  @ApiTags('Products')
  @ApiOperation({
    summary: 'Get one product',
    description: 'Gives an specific product using its productId',
  })
  async getOne(@Param('productId', MongoIdPipe) productId: string) {
    //Con los pipes(ParseIntPipe) confirmamos y transformamos esta clase de valores
    return this.productsService.findOne(productId);
  }

  @Put('/:productId')
  @ApiTags('Products')
  @ApiOperation({
    summary: 'Updates a product',
    description: "Allows  to changes a product's info",
  })
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }
  @Delete('/:productId')
  @ApiTags('Products')
  @ApiOperation({
    summary: 'deletes a product',
    description: ' Removes a product from the DB',
  })
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.remove(productId);
  }
}
