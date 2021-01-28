import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from './filters/api-exception.filter';
import { LogginModule } from './logging/logging.module';

@Module({
  imports: [
    //LogginModule,
    ReservationsModule,
    UsersModule,
    CarsModule,
    //ReviewsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class RootModule {}
