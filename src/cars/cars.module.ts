import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { LogginModule } from 'src/logging/logging.module';

@Module({
  imports: [LogginModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
