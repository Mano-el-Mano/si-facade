import { IsString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  starts: string;
  @IsString()
  ends: string;
  @IsNumber()
  carId: number;
  @IsNumber()
  userId: number;
}
