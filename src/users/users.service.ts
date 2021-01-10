import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import fetch from 'node-fetch';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiException } from 'src/exceptions/api-exception';

@Injectable()
export class UsersService {
  async signUp(user: CreateUserDto) {
    const signUpOptions = {
      method: 'POST',
      url: 'http://localhost:3456/public/users/sign-up',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    };

    const options: any = Object.assign({}, signUpOptions);
    options.body = JSON.stringify(signUpOptions.body);
    console.log('sent');
    const res = await fetch(
      'http://localhost:3456/public/users/sign-up',
      options,
    );
    if (res.status < 300) {
      return res.json();
    } else {
      throw new ApiException('something went wrong', res.status);
    }
  }

  async signIn(user: LoginUserDto) {
    const signUpOptions = {
      method: 'POST',
      url: 'http://localhost:3456/public/users/sign-in',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: {
        email: user.email,
        password: user.password,
      },
    };

    const options: any = Object.assign({}, signUpOptions);
    options.body = JSON.stringify(signUpOptions.body);
    console.log('sent');
    const res = await fetch(
      'http://localhost:3456/public/users/sign-in',
      options,
    );
    if (res.status < 300) {
      return res.json();
    } else {
      throw new ApiException('something went wrong', res.status);
    }
  }
}
