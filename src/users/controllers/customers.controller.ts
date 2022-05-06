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
import { CustomersService } from '../services/customers.service';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from './../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('/')
  @ApiTags('Customers')
  @ApiOperation({
    summary: 'Gets a list of all the orders',
    description: 'Obtains alist of all the orders saved in the DB',
  })
  async getAll(
    // @Query('limit') limit = 10,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterCustomerDto,
  ) {
    //Haciendo destructuring, pero puede ser mejor especificar mejor cada query
    //const { limit = 10, offset = 0 } = queries;
    return await this.customerService.getAll(params);
  }

  @Post('/')
  @ApiTags('Customers')
  @ApiOperation({
    summary: 'Gets a list of all the customers',
    description: 'Obtains alist of all the customers saved in the DB',
  })
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Get('/:customerId')
  @ApiTags('Customers')
  @ApiOperation({
    summary: 'Gets info of a customer',
    description: 'Obtains the info of the especified customer',
  })
  async getOne(@Param('customerId', MongoIdPipe) customerId: string) {
    return await this.customerService.getOne(customerId);
  }

  @Put('/:customerId')
  @ApiTags('Customers')
  @ApiOperation({
    summary: 'Updates a customer',
    description: 'Updates info of a customer',
  })
  async update(
    @Body() payload: UpdateCustomerDto,
    @Param('customerId', MongoIdPipe) customerId: string,
  ) {
    return await this.customerService.update(customerId, payload);
  }
  @Delete('/:customerId')
  @ApiTags('Customers')
  @ApiOperation({
    summary: 'Deletes a customer',
    description: 'Deletes a customer in the DB',
  })
  async delete(@Param('customerId') customerId: string) {
    return await this.customerService.delete(customerId);
  }
}
