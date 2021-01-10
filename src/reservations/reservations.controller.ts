import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Headers('authorization') jwt,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.create(createReservationDto, jwt);
  }

  @Get(':id')
  getById(@Headers('authorization') jwt, @Param() params) {
    return this.reservationsService.getById(params.id, jwt);
  }

  @Get()
  getAll(@Headers('authorization') jwt) {
    return this.reservationsService.getAll(jwt);
  }
}
