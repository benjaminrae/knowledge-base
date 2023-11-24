import {
  UserCredentialsReadRepositoryPort,
  UserReadRepositoryPort,
} from '@app/application';
import { PasswordService, TokenService } from '@app/core';
import { Either, failure, success } from '@knowledge-base/shared';
import { LoginUserCommand } from './login-user.command';

export class LoginUserHandler {
  constructor(
    private readonly userReadRepository: UserReadRepositoryPort,
    private readonly userCredentialsReadRepository: UserCredentialsReadRepositoryPort,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginUserCommand): Promise<Either<string, Error>> {
    const user = await this.userReadRepository.findByEmail(command.email);

    if (user === undefined) {
      return failure(new Error('Invalid credentials'));
    }

    const userCredentials =
      await this.userCredentialsReadRepository.findByUserId(user.id);

    if (userCredentials === undefined) {
      return failure(new Error('Invalid credentials'));
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      command.password,
      userCredentials.getProps().password,
    );

    if (!isPasswordValid) {
      return failure(new Error('Invalid credentials'));
    }

    const token = this.tokenService.generateToken({
      id: user.id,
      email: user.getProps().email,
    });

    return success(token);
  }
}
