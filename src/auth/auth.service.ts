import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
      ) {}

      // async validateGoogleUser(profile: any) {
      //   const { googleId, email, name } = profile;
    
      //   let user = await this.prisma.user.findUnique({
      //     where: { email },
      //   });
    
      //   if (!user) {
      //     user = await this.prisma.user.create({
      //       data: { email, name, googleId },
      //     });
      //   }
    
      //   const payload = { sub: user.id, email: user.email };
      //   const token = this.jwtService.sign(payload);
    
      //   console.log("user", user);
      //   return { user, token };
      // }

      async validateGoogleUser(req: any) {

        const email = req.user.email;

        if (!email) {
          throw new Error('Email is required for Google login.');
        }
      
        let user = await this.prisma.user.findUnique({
          where: { email },
        });
      
        if (!user) {
          user = await this.prisma.user.create({
            data: {
              email: req.user.email,
              name: req.user.name,
              googleId: req.user.googleId,
            },
          });
        }
      
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
      
        return { user, token };
      }
      
}
