import { Injectable, ConflictException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getUserByUserName(userName: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userName },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password, userName, email } = data;

    const isExistEmail = await this.getUserByEmail(email);

    if (isExistEmail) {
      throw new ConflictException('Ya existe Un usuario con ese correo');
    }

    const isExistUserName = await this.getUserByUserName(userName);

    if (isExistUserName) {
      throw new ConflictException(
        'Ya existe un usuario con ese nombre de usuario',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        ok: false,
        message: 'No se encontró un usuario con ese email',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        ok: false,
        message: 'La contraseña no es válida',
      };
    }

    return {
      ok: true,
    };
  }
}
