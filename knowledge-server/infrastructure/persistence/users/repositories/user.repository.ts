import { User } from '@app/core';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { TypeormRepositoryAdapter } from '@app/infrastructure/persistence/typeorm/adapters/typeorm-repository.adapter';
import { UserMapper } from '@app/infrastructure/persistence/users/mappers/user.mapper';
import { UserModel } from '@app/infrastructure/persistence/users/models/user.model';
import { Repository } from '@knowledge-base/shared';
import { Inject, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';

export class UserRepository
  extends TypeormRepositoryAdapter<User, UserModel>
  implements Repository<User>
{
  table = UsersKeys.USER_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UsersKeys.USER_MAPPER) mapper: UserMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(datasource, mapper, eventEmitter, new Logger(UserRepository.name));
  }
}
