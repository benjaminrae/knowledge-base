import { UserReadRepositoryPort } from '@app/application';
import { User } from '@app/core';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { TypeormReadRepositoryAdapter } from '@app/infrastructure/persistence/typeorm/adapters/typeorm-read-repository.adapter';
import { UserMapper } from '@app/infrastructure/persistence/users/mappers/user.mapper';
import { UserModel } from '@app/infrastructure/persistence/users/models/user.model';
import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class UserReadRepository
  extends TypeormReadRepositoryAdapter<User, UserModel>
  implements UserReadRepositoryPort
{
  table = UsersKeys.USER_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UsersKeys.USER_MAPPER) mapper: UserMapper,
  ) {
    super(datasource, mapper);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.createQueryBuilder()
      .select()
      .from(this.table, 'user')
      .where('user.email = :email', { email })
      .execute();

    if (!user) {
      return undefined;
    }

    return this.mapper.toDomain(user as UserModel);
  }
}
