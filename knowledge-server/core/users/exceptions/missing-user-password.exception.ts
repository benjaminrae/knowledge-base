import { DomainError, ErrorDetails } from '@knowledge-base/shared';

export class MissingUserPasswordException extends DomainError {
  constructor(details?: ErrorDetails) {
    super({ message: 'User password is required', details });
  }
}
