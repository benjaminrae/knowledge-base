import { LoginUserCommand } from '@app/application/users';
import { AuthKeys } from '@app/infrastructure/di/auth/auth.keys';
import { Either } from '@knowledge-base/shared';
import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUserHttpRequest } from '../../requests/login-user.http.request';

@Controller()
export class LoginUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Login user' })
  @Post('users/login')
  async loginUser(
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    loginUserRequestDTO: LoginUserHttpRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginCommand = new LoginUserCommand({
      email: loginUserRequestDTO.email,
      password: loginUserRequestDTO.password,
    });

    const loginResult = await this.commandBus.execute<
      LoginUserCommand,
      Either<string, Error>
    >(loginCommand);

    if (loginResult.isFailure()) {
      throw new UnauthorizedException(loginResult.value.message);
    }

    response.cookie(AuthKeys.AUTH_COOKIE, loginResult.value);

    return {
      token: loginResult.value,
    };
  }
}
