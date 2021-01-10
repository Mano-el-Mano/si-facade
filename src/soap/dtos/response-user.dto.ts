import { Exclude } from 'class-transformer';

export class ResponseUserDTO {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<ResponseUserDTO>) {
    Object.assign(this, partial);
  }
}
