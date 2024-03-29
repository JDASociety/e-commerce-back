import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    name: 'id',
    type: String,
    required: true,
    description: 'El id del usuario',
    example: 'e6035de7-0770-48c3-8811-b59e07ad44a8',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    name: 'userName',
    type: String,
    required: true,
    description: 'Es el nombre único de usuario',
    example: 'diegorost',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    name: 'firstName',
    type: String,
    required: true,
    description: 'Es el primer nombre perteneciente al usuario',
    example: 'diego',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    type: String,
    required: true,
    description: 'Es el apellido del usuario',
    example: 'rost',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    name: 'email',
    type: String,
    required: true,
    description: 'Correo electronico del usuario',
    example: 'diegorost@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    description: 'Es la contraseña del usuario',
    example: 'TeExtrañoRost12345678',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    name: 'verified',
    type: String,
    required: true,
    description:
      'Es la caracteristica de la cuenta nueva o existente que muestra si está operada por una persona u organización real específica ',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;

  @ApiProperty({
    name: 'image',
    type: String,
    required: true,
    description:
      'Este campo contendrá el link de la imagen que se cargará para la cuenta del usuario',
    example:
      'https://rockfm-cdnmed.rockfm.fm/resources/jpg/1/2/1627558630021.jpg',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    name: 'createdAt',
    type: String,
    required: true,
    description: 'Se genera la fecha y hora en que el usuario creó su cuenta',
    example: '2024-03-29 18:54:01.529',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
