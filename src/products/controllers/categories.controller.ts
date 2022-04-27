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
import { Category } from '../entities/categories.entity';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  getAll(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): Category[] {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return this.categoriesService.findAll();
  }

  @Post('/')
  create(@Body() payload: CreateCategoryDto): Category {
    return this.categoriesService.create(payload);
  }
  @Get('/:categoryId')
  getOne(
    @Param('categoryId', ParseIntPipe) categoryId: Category['id'],
  ): Category {
    return this.categoriesService.findOne(categoryId);
  }

  @Put('/:categoryId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: Category['id'],
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, payload);
  }
  @Delete('/:categoryId')
  delete(
    @Param('categoryId', ParseIntPipe) categoryId: Category['id'],
  ): Category {
    return this.categoriesService.delete(categoryId);
  }
}
