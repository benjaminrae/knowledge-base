import { DomainError, ErrorDetails } from '@knowledge-base/shared';

export class MissingUserEmailException extends DomainError {
  constructor(details?: ErrorDetails) {
    super({ message: 'User email is required', details });
  }
}
