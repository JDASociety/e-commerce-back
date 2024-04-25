import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { bcryptAdapter } from '../config/bcrypt.adapter';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password, userName, email } = data;

    const isExistEmail = await this.userService.getUserByEmail(email);

    if (isExistEmail) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    const isExistUserName = await this.userService.getUserByUserName(userName);

    if (isExistUserName) {
      throw new ConflictException(
        'Ya existe un usuario con ese nombre de usuario',
      );
    }

    const hashedPassword = await bcryptAdapter.hash(password);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async validateUser({
    email,
    userName,
  }: {
    userName?: string;
    email?: string;
  }): Promise<User> {
    let user: User;

    if (email) {
      user = await this.userService.getUserByEmail(email);
    }

    if (userName) {
      user = await this.userService.getUserByUserName(userName);
    }

    if (!user) {
      throw new BadRequestException(
        'No se encontró un usuario con ese email o nombre de usuario',
      );
    }

    return user;
  }
}
