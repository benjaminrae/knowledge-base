import { TokenService } from '@app/core';
import { JwtPayload, sign } from 'jsonwebtoken';

export type JwtTokenPayload = JwtPayload & {
  sub: {
    id: string;
    email: string;
  };
};

export type JwtTokenServiceProps = {
  secret: string;
  tokenExpiration: string;
};

export class JwtTokenService implements TokenService {
  private readonly secret;
  private readonly tokenExpiration;

  constructor({ secret, tokenExpiration }: JwtTokenServiceProps) {
    this.secret = secret;
    this.tokenExpiration = tokenExpiration;
  }

  validateToken(): boolean {
    throw new Error('Method not implemented.');
  }
  refreshToken(): string {
    throw new Error('Method not implemented.');
  }
  decodeToken<Payload>(): Payload {
    throw new Error('Method not implemented.');
  }

  generateToken<Payload = JwtTokenPayload>(payload: Payload): string {
    return sign(payload as object, this.secret, {
      expiresIn: this.tokenExpiration,
    });
  }
}
