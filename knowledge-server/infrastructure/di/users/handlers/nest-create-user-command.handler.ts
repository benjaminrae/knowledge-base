import { CreateUserCommand, CreateUserHandler } from '@app/application';
import { PasswordService, User, UserCredentials } from '@app/core';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { Repository } from '@knowledge-base/shared';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class NestCreateUserCommandHandler
  extends CreateUserHandler
  implements ICommandHandler
{
  constructor(
    @Inject(UsersKeys.USER_REPOSITORY) userRepository: Repository<User>,
    @Inject(UsersKeys.USER_CREDENTIALS_REPOSITORY)
    userCredentialsRepository: Repository<UserCredentials>,
    @Inject(UsersKeys.PASSWORD_SERVICE) passwordService: PasswordService,
  ) {
    super(userRepository, userCredentialsRepository, passwordService);
  }

  async execute(command: CreateUserCommand) {
    return super.execute(command);
  }
}
