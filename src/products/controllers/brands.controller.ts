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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
import { ParseIntPipe } from 'src/shared/parse-int.pipe';
import {
  CreateBrandDto,
  FilterBrandDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('/')
  @ApiTags('Brands')
  @ApiOperation({
    summary: 'Get all the brands',
    description: 'Obtains a list of all the brands',
  })
  async getAll(
    // @Query('limit') limit = 10,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterBrandDto,
  ) {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return await this.brandsService.getAll(params);
  }

  @Post('/')
  @ApiTags('Brands')
  @ApiOperation({
    summary: 'Creates a brand',
    description: 'Returns the new   brand',
  })
  async create(@Body() payload: CreateBrandDto) {
    return await this.brandsService.create(payload);
  }

  @Get('/:brandId')
  @ApiTags('Brands')
  @ApiOperation({
    summary: 'Get a brand',
    description: 'Obtains a  brand',
  })
  async getOne(@Param('brandId', MongoIdPipe) brandId: string) {
    return await this.brandsService.getOne(brandId);
  }

  @Put('/:brandId')
  @ApiTags('Brands')
  @ApiOperation({
    summary: 'Updates a brand',
    description: 'Updates an espcific brand',
  })
  async update(
    @Param('brandId', MongoIdPipe) brandId: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return await this.brandsService.update(brandId, payload);
  }
  @Delete('/:brandId')
  @ApiTags('Brands')
  @ApiOperation({
    summary: 'Deletes a brand',
    description: 'Deletes a  brand from the DB',
  })
  delete(@Param('brandId') brandId: string) {
    return this.brandsService.delete(brandId);
  }
}
