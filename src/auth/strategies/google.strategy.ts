import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/v1/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log("Google Profile:", profile); // Debugging
    const { name, emails, id } = profile;
  
    const user = {
      googleId: id,
      email: emails?.[0]?.value || null,
      name: `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),      
      accessToken,
    };
  
    done(null, user);
  }
}
