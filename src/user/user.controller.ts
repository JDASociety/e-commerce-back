import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces';
import { UserDto } from './dtos';
import { ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registra de Usuario',
    description: 'Registra un usuario en la aplicacion',
  })
  @ApiBody({
    type: UserDto,
    description: 'Product data',
    examples: {
      examples1: {
        value: {
          firstName: 'el m',
          lastName: 'maria',
          userName: 'elm',
          email: 'elm@hotmail.com',
          password: '123467',
          image: '',
        },
      },
    },
  })
  async register(@Body() userData: User) {
    const user = await this.userService.createUser(userData);
    if (!user) {
      throw new HttpException(
        'User registration failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'User registered successfully.', user };
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
