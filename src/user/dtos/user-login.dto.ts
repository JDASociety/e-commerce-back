import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserLoginDto {
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
}
