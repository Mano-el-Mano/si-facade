import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api-exception';
import { CreateCarDto } from './dto/create-car.dto';
import fetch from 'node-fetch';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class CarsService {
  constructor() {} //private readonly loggingService: LoggingService

  async create(car: CreateCarDto, jwt: string) {
    try {
      const reservationOptions = {
        method: 'POST',
        url: 'http://localhost:3456/protected/cars',
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: {
          model: car.model,
          release: car.release,
          brand: car.brand,
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      options.body = JSON.stringify(reservationOptions.body);
      const res = await fetch('http://localhost:3456/protected/cars', options);
      if (res.status < 300) {
        return res.json();
      } else {
        throw new ApiException('something went wrong', res.status);
      }
    } catch (e) {
      throw new ApiException('Internal server error', HttpStatus.UNAUTHORIZED);
    }
  }

  async getById(id: number, jwt: string) {
    try {
      const reservationOptions = {
        method: 'GET',
        url: `http://localhost:3456/protected/cars/${id}`,
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      const res = await fetch(
        `http://localhost:3456/protected/cars/${id}`,
        options,
      );
      if (res.status < 300) {
        return res.json();
      } else {
        throw new ApiException('something went wrong', res.status);
      }
    } catch (e) {
      throw new ApiException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll(jwt: string) {
    /*try {
      const reservationOptions = {
        method: 'GET',
        url: 'http://localhost:3456/protected/cars',
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      const res = await fetch(`http://localhost:3456/protected/cars`, options);
      if (res.status < 300) {
        return res.json();
      } else {
        throw new ApiException('something went wrong', res.status);
      }
    } catch (e) {
      throw new ApiException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        e.toString(),
      );
    }*/
    return 'vær så artig';
  }
}
