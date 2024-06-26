import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { BcryptAdapter } from 'src/common/config/bcrypt.adapter';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  imports: [
    UserModule,
    BcryptAdapter,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1day' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
})
export class AuthModule {}
