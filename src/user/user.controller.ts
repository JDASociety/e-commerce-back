import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() userData: User) {
    const user = await this.userService.createUser(userData);
    if (user) {
      return { message: 'User registered successfully.' };
    }

    throw new HttpException('User registration failed', HttpStatus.BAD_REQUEST);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const isValid = await this.userService.validateUser(email, password);

    if (!isValid.ok) {
      throw new HttpException(isValid.message, HttpStatus.UNAUTHORIZED);
    }
    // Aquí deberías generar y devolver un JWT o algún mecanismo de sesión
    return { message: 'Login successful' };
  }
}
