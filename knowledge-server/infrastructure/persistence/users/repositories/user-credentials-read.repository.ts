import { UserCredentialsReadRepositoryPort } from '@app/application';
import { UserCredentials } from '@app/core';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { TypeormReadRepositoryAdapter } from '@app/infrastructure/persistence/typeorm/adapters/typeorm-read-repository.adapter';
import { UserCredentialsMapper } from '@app/infrastructure/persistence/users/mappers/user-credentials.mapper';
import { UserCredentialsModel } from '@app/infrastructure/persistence/users/models/user-credentials.model';
import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class UserCredentialsReadRepository
  extends TypeormReadRepositoryAdapter<UserCredentials, UserCredentialsModel>
  implements UserCredentialsReadRepositoryPort
{
  table = UsersKeys.USER_CREDENTIALS_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UsersKeys.USER_CREDENTIALS_MAPPER) mapper: UserCredentialsMapper,
  ) {
    super(datasource, mapper);
  }

  async findByUserId(userId: string): Promise<UserCredentials | undefined> {
    const [userCredentials] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'credentials')
      .where('credentials.user_id = :userId', { userId })
      .execute();

    if (!userCredentials) {
      return undefined;
    }

    return this.mapper.toDomain(userCredentials as UserCredentialsModel);
  }
}
