import { Controller, Get, Post, Body, Headers, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Headers('authorization') jwt, @Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto, jwt);
  }

  @Get(':id')
  getById(@Headers('authorization') jwt, @Param() params) {
    return this.carsService.getById(params.id, jwt);
  }

  @Get()
  getAll(@Headers('authorization') jwt) {
    return this.carsService.getAll(jwt);
  }
}
