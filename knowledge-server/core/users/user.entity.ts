import { AggregateRoot, UniqueEntityId } from '@knowledge-base/shared';
import { UserCreatedEvent } from './events/user-created.event';
import { UserLoggedInEvent } from './events/user-logged-in.event';
import { MissingUserEmailException } from './exceptions/missing-user-email.exception';
import { CreateUserProps, UserProps } from './types';

export class User extends AggregateRoot<UserProps> {
  static create(props: CreateUserProps): User {
    const user = new User({
      id: new UniqueEntityId(),
      props,
    });

    user.addEvent(new UserCreatedEvent(user));

    return user;
  }

  public login(): void {
    const now = new Date();

    if (!this.props.firstLogin) {
      this.props.firstLogin = now;
    }

    this.props.lastLogin = now;

    this.addEvent(new UserLoggedInEvent(this));
  }

  protected validate(props: UserProps): void {
    if (!props.email) {
      throw new MissingUserEmailException();
    }
  }
}
