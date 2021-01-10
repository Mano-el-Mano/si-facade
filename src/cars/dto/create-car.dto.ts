import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  brand: string;
  @IsString()
  release: string;
  @IsString()
  model: number;
}
