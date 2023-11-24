import { UserCredentials } from '@app/core';
import { ReadRepository } from '@knowledge-base/shared';

export interface UserCredentialsReadRepositoryPort
  extends ReadRepository<UserCredentials> {
  findByUserId(userId: string): Promise<UserCredentials | undefined>;
}
