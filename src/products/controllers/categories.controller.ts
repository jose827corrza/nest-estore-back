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
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/categories.dto';
import { MongoIdPipe } from 'src/shared/mongo-id.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  @ApiTags('Categories')
  @ApiOperation({
    summary: 'Get a list of categories',
    description: 'Obtains a list of all the categories',
  })
  async getAll(
    // @Query('limit') limit = 10,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterCategoryDto,
  ) {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return this.categoriesService.findAll(params);
  }

  @Post('/')
  @ApiTags('Categories')
  @ApiOperation({
    summary: 'Creates a category',
    description: 'Saves a new category in DB',
  })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }
  @Get('/:categoryId')
  @ApiTags('Categories')
  @ApiOperation({
    summary: 'Get a category',
    description: 'Obtains a category',
  })
  async getOne(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return await this.categoriesService.findOne(categoryId);
  }

  @Put('/:categoryId')
  @ApiTags('Categories')
  @ApiOperation({
    summary: 'Updates a category',
    description: 'Updates  info about an especific category',
  })
  async update(
    @Param('categoryId', MongoIdPipe) categoryId: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return await this.categoriesService.update(categoryId, payload);
  }
  @Delete('/:categoryId')
  @ApiTags('Categories')
  @ApiOperation({
    summary: 'Deletes a category',
    description: 'Deletes a category from the DB',
  })
  delete(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return this.categoriesService.delete(categoryId);
  }
}
