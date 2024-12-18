import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { config } from 'dotenv';
import { PrismaModule } from 'src/prisma/prisma.module';

config();

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5h'},
    }),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
