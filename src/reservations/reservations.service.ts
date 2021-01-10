import { HttpStatus, Injectable } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api-exception';
import { CreateReservationDto } from './dto/create-reservation.dto';
import fetch from 'node-fetch';

@Injectable()
export class ReservationsService {
  async create(reservation: CreateReservationDto, jwt: string) {
    try {
      const reservationOptions = {
        method: 'POST',
        url: 'http://localhost:3456/protected/reservations',
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: {
          starts: reservation.starts,
          ends: reservation.ends,
          carId: reservation.carId,
          userId: reservation.userId,
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      options.body = JSON.stringify(reservationOptions.body);
      console.log('sent');
      const res = await fetch(
        'http://localhost:3456/protected/reservations',
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

  async getById(id: number, jwt: string) {
    try {
      const reservationOptions = {
        method: 'GET',
        url: `http://localhost:3456/protected/reservations${id}`,
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      const res = await fetch(
        `http://localhost:3456/protected/reservations/${id}`,
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
    try {
      const reservationOptions = {
        method: 'GET',
        url: 'http://localhost:3456/protected/reservations',
        headers: {
          Authorization: jwt,
          'content-type': 'application/json',
          accept: 'application/json',
        },
      };

      const options: any = Object.assign({}, reservationOptions);
      const res = await fetch(
        `http://localhost:3456/protected/reservations`,
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
}
