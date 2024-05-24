import { Module } from '@nestjs/common';
import { BcryptAdapter } from './config/bcrypt.adapter';

@Module({
  providers: [BcryptAdapter],
  exports: [BcryptAdapter],
})
export class CommonModule {}
