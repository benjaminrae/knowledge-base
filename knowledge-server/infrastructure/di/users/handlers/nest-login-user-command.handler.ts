import {
  LoginUserCommand,
  LoginUserHandler,
  UserCredentialsReadRepositoryPort,
  UserReadRepositoryPort,
} from '@app/application';
import { PasswordService, TokenService } from '@app/core';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthKeys } from '../../auth/auth.keys';
import { UsersKeys } from '../users.keys';

@CommandHandler(LoginUserCommand)
export class NestLoginUserCommandHandler
  extends LoginUserHandler
  implements ICommandHandler
{
  constructor(
    @Inject(UsersKeys.USER_READ_REPOSITORY)
    userReadRepository: UserReadRepositoryPort,
    @Inject(UsersKeys.USER_CREDENTIALS_READ_REPOSITORY)
    userCredentialsReadRepository: UserCredentialsReadRepositoryPort,
    @Inject(UsersKeys.PASSWORD_SERVICE)
    passwordService: PasswordService,
    @Inject(AuthKeys.TOKEN_SERVICE) tokenService: TokenService,
  ) {
    super(
      userReadRepository,
      userCredentialsReadRepository,
      passwordService,
      tokenService,
    );
  }

  async execute(command: LoginUserCommand) {
    return super.execute(command);
  }
}
