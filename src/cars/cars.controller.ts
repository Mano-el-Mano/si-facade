import { Controller, Get, Post, Body, Headers, Param } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';
import { LogTypes } from 'src/logTypes';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  private logType: LogTypes;
  constructor(
    private readonly carsService: CarsService, //private readonly loggingService: LoggingService,
  ) {
    this.logType = LogTypes.CAR_RENTAL;
  }

  @Post()
  async create(
    @Headers('authorization') jwt,
    @Body() createCarDto: CreateCarDto,
  ) {
    const jsonRes = await this.carsService.create(createCarDto, jwt);
    console.log(jwt);
    console.log(jsonRes);
    /* const res = await this.loggingService.sendCarRentalLog(
      this.logType,
      jsonRes.carId,
      jsonRes.createdAt,
    );*/
    return jsonRes;
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
