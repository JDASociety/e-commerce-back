import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserToken } from '../../auth/interfaces/index';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as UserToken;
  },
);
