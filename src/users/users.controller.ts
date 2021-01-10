import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  create(@Body() user: CreateUserDto): Promise<any> {
    return this.usersService.signUp(user);
  }

  @Post('sign-in')
  findOne(@Body() user: LoginUserDto): Promise<any> {
    return this.usersService.signIn(user);
  }
}
