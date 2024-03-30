import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserDto, UserLoginDto } from 'src/user/dtos';
import { User } from 'src/user/interfaces';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { User as UserDecorator } from 'src/user/decorator';
import { UserToken } from './interfaces';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registra de Usuario',
    description: 'Registra un usuario en la aplicacion',
  })
  @ApiBody({
    type: UserDto,
    description: 'Registro de usuario en la aplicacion',
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
  @ApiResponse({
    status: 200,
    description: 'Usuario registrado con éxito',
    schema: {
      properties: {
        id: { type: 'number' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        userName: { type: 'string' },
        email: { type: 'string' },
        image: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya registrado',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        statusCode: { type: 'number', default: 409 },
      },
    },
  })
  async register(@Body() userData: User) {
    const user = await this.authService.createUser(userData);

    if (!user) {
      throw new HttpException(
        'El usuario no pudo ser registrado. Intente nuevamente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { message: 'User registered successfully.', user };
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login de Usuario',
    description: 'Hace login de un usuario en la aplicacion',
  })
  @ApiBody({
    type: UserLoginDto,
    description: 'Login de usuario en la aplicacion',
    examples: {
      email: {
        summary: 'Login con email',
        description: 'El usuario se loguea con su correo electronico',
        value: {
          email: 'elm@hotmail.com',
          password: '123467',
        },
      },
      userName: {
        summary: 'Login con username',
        description: 'El usuario se loguea con su nombre de usuario',
        value: {
          userName: 'elm',
          password: '123467',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario verificado',
    schema: {
      type: 'object',
      properties: {
        userName: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Usuario no verificado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', default: 400 },
        message: { type: 'string' },
      },
    },
  })
  async login(
    @Body('password') password: string,
    @Body('email') email?: string,
    @Body('userName') userName?: string,
  ) {
    const user = await this.authService.validateUser({
      email,
      userName,
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'La contraseña es incorrecta',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user.verified) {
      throw new HttpException(
        'El usuario no ha sido verificado',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashValuesToken = { id: user.id, email: user.email };

    const token = this.jwtService.sign(hashValuesToken);

    const userTransform = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return { user: userTransform, token };
  }

  @Get('refresh-token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresca el token',
    description: 'Refresca el token de acceso',
  })
  @ApiResponse({
    status: 200,
    description: 'Token refrescado correctamente',
    schema: {
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            userName: { type: 'string' },
            email: { type: 'string' },
            image: { type: 'string' },
          },
        },
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        statusCode: { type: 'number', default: 401 },
      },
    },
  })
  async refreshToken(@UserDecorator() userData: UserToken) {
    const user = await this.userService.getUserByEmail(userData.email);

    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    const hashValuesToken = { id: user.id, email: user.email };

    const newToken = this.jwtService.sign(hashValuesToken);

    const userTransform = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });

    return { user: userTransform, token: newToken };
  }
}
