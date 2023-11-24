import { UserCredentials } from '@app/core';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { TypeormRepositoryAdapter } from '@app/infrastructure/persistence/typeorm/adapters/typeorm-repository.adapter';
import { UserCredentialsMapper } from '@app/infrastructure/persistence/users/mappers/user-credentials.mapper';
import { UserCredentialsModel } from '@app/infrastructure/persistence/users/models/user-credentials.model';
import { Repository } from '@knowledge-base/shared';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DataSource } from 'typeorm';

@Injectable()
export class UserCredentialsRepository
  extends TypeormRepositoryAdapter<UserCredentials, UserCredentialsModel>
  implements Repository<UserCredentials>
{
  table = UsersKeys.USER_CREDENTIALS_TABLE;

  constructor(
    datasource: DataSource,
    @Inject(UsersKeys.USER_CREDENTIALS_MAPPER) mapper: UserCredentialsMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      datasource,
      mapper,
      eventEmitter,
      new Logger(UserCredentialsRepository.name),
    );
  }
}
