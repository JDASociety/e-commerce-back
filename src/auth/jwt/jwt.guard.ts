import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (!err && user) {
      return user;
    }

    if (!info) {
      throw new AuthException('El JWT no ha sido proporcionado o es inválido');
    }

    if (info.name === 'TokenExpiredError') {
      throw new AuthException('Tu token ha expirado');
    }

    if (info.name === 'JsonWebTokenError') {
      throw new AuthException('El JWT es inválido');
    }

    throw err || new UnauthorizedException();
  }
}
