import { User } from '@app/core';
import { ReadRepository } from '@knowledge-base/shared';

export interface UserReadRepositoryPort extends ReadRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;
}
