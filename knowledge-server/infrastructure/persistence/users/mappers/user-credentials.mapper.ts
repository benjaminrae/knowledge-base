import { UserCredentials } from '@app/core';
import { Mapper, UniqueEntityId } from '@knowledge-base/shared';
import { Injectable } from '@nestjs/common';
import { UserCredentialsModel } from '../models/user-credentials.model';

@Injectable()
export class UserCredentialsMapper
  implements Mapper<UserCredentials, UserCredentialsModel, unknown>
{
  toDomain(data: UserCredentialsModel): UserCredentials {
    return new UserCredentials({
      id: new UniqueEntityId(data.id),
      props: {
        password: data.password,
        userId: data.user_id,
      },
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  toPersistence(domainEntity: UserCredentials): UserCredentialsModel {
    const userCredentialsModel = new UserCredentialsModel();
    const userProps = domainEntity.getProps();

    userCredentialsModel.id = domainEntity.id;
    userCredentialsModel.created_at = userProps.createdAt;
    userCredentialsModel.updated_at = userProps.updatedAt;
    userCredentialsModel.user_id = userProps.userId;
    userCredentialsModel.password = userProps.password;

    return userCredentialsModel;
  }

  toPresenter() {
    throw new Error('Cannot return a presenter from a UserCredentialsMapper');
  }
}
