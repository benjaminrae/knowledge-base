import { AggregateRoot, UniqueEntityId } from '@knowledge-base/shared';
import { MissingUserPasswordException } from './exceptions/missing-user-password.exception';
import { CreateUserCredentialsProps, UserCredentialsProps } from './types';

export class UserCredentials extends AggregateRoot<UserCredentialsProps> {
  static create(props: CreateUserCredentialsProps): UserCredentials {
    return new UserCredentials({
      id: new UniqueEntityId(),
      props,
    });
  }

  protected validate(props: CreateUserCredentialsProps): void {
    if (!props.password) {
      throw new MissingUserPasswordException();
    }
  }
}
