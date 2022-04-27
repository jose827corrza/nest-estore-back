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
import { ParseIntPipe } from 'src/shared/parse-int.pipe';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';
import { Brand } from '../entities/brands.entity';
import { BrandsService } from '../services/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('/')
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): Brand[] {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return this.brandsService.getAll();
  }

  @Post('/')
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Get('/:brandId')
  getOne(@Param('brandId', ParseIntPipe) brandId: Brand['id']): Brand {
    return this.brandsService.getOne(brandId);
  }

  @Put('/:brandId')
  update(
    @Param('brandId', ParseIntPipe) brandId: Brand['id'],
    @Body() payload: UpdateBrandDto,
  ): Brand {
    return this.brandsService.update(brandId, payload);
  }
  @Delete()
  delete(@Param('brandId') brandId: Brand['id']) {
    return this.brandsService.delete(brandId);
  }
}
