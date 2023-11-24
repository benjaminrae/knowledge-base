import { DomainEvent, DomainEventMetadata } from '@knowledge-base/shared';
import { MissingUserIdException } from '../exceptions';
import { User } from '../user.entity';

export class UserLoggedInEvent extends DomainEvent {
  #user: User;

  constructor(user: User) {
    super({
      aggregateId: user.id.toString(),
      metadata: {
        timestamp: Date.now(),
      },
    });

    this.#user = user;
  }

  validate(props: {
    aggregateId: string;
    metadata?: DomainEventMetadata;
  }): void {
    if (!props.aggregateId) {
      throw new MissingUserIdException();
    }
  }
}
