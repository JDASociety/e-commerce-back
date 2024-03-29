import { Controller } from '@nestjs/common';

import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Usuarios')
export class UserController {
  constructor(private userService: UserService) {}
}
