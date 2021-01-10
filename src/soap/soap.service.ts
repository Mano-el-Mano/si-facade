import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';
import { ResponseUserDTO } from './dtos/response-user.dto';

@Injectable()
export class UserSoapService {
  private soapClient;
  constructor(@Inject('SOAP_CLIENT') soapClient: any) {
    this.soapClient = soapClient;
  }

  async getUser(id: string): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      this.soapClient.getUser({ userId: id }, async (err, res) => {
        if (err) reject(err);
        try {
          const parsedUser: ResponseUserDTO = plainToClass(
            ResponseUserDTO,
            JSON.parse(res.user),
          );
          resolve(parsedUser);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async getAllUsers(): Promise<UserDto[]> {
    return new Promise((resolve, reject) => {
      this.soapClient.getAllUsers({}, async (err, res) => {
        if (err) reject(err);
        const userResponse: Partial<ResponseUserDTO>[] = JSON.parse(res.users);
        try {
          const parsedUsers: ResponseUserDTO[] = userResponse.map((user) => {
            return plainToClass(ResponseUserDTO, user);
          });
          resolve(parsedUsers);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
