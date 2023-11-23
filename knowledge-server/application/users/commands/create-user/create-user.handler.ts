import { PasswordService, User, UserCredentials } from '@app/core';
import { Either, Repository, failure, success } from '@knowledge-base/shared';
import { CreateUserCommand } from './create-user.command';

export class CreateUserHandler {
  userWriteRepository: any;
  userCredentialsWriteRepository: any;
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly userCredentialsRepository: Repository<UserCredentials>,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(command: CreateUserCommand): Promise<Either<string, Error>> {
    try {
      const user = User.create({
        email: command.email,
      });

      const password = await this.passwordService.hashPassword(
        command.password,
      );

      const userCredentials = UserCredentials.create({
        password,
        userId: user.id,
      });

      const userResult = await this.userRepository.create(user);

      if (userResult.isFailure()) {
        return failure(userResult.value);
      }

      const userCredentialsResult =
        await this.userCredentialsRepository.create(userCredentials);

      if (userCredentialsResult.isFailure()) {
        return failure(userCredentialsResult.value);
      }

      return success(user.id);
    } catch (error) {
      return failure(error);
    }
  }
}
