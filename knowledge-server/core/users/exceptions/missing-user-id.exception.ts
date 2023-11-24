import { DomainError, ErrorDetails } from '@knowledge-base/shared';

export class MissingUserIdException extends DomainError {
  constructor(details?: ErrorDetails) {
    super({ message: 'User id is required', details });
  }
}
