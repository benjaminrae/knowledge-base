import { JwtTokenService } from '@app/application';
import { env } from '@app/configs';
import { Module, Provider } from '@nestjs/common';
import { AuthKeys } from './auth.keys';

const providers: Provider[] = [
  {
    useFactory: () =>
      new JwtTokenService({ secret: env.JWT_SECRET, tokenExpiration: '24h' }),
    provide: AuthKeys.TOKEN_SERVICE,
  },
];

@Module({
  providers,
  exports: [AuthKeys.TOKEN_SERVICE],
})
export class AuthModule {}
