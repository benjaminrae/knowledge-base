import { User } from '@app/core';
import { UserResponse } from '@app/infrastructure/api/http-rest/users/responses/user.response';
import { Mapper, UniqueEntityId } from '@knowledge-base/shared';
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserMapper implements Mapper<User, UserModel, UserResponse> {
  toDomain(data: UserModel): User {
    return new User({
      id: new UniqueEntityId(data.id),
      props: {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
      },
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  toPersistence(domainEntity: User): UserModel {
    const userModel = new UserModel();
    const userProps = domainEntity.getProps();

    userModel.id = domainEntity.id;
    userModel.email = userProps.email;
    userModel.created_at = userProps.createdAt;
    userModel.updated_at = userProps.updatedAt;
    userModel.first_name = userProps.firstName;
    userModel.last_name = userProps.lastName;

    return userModel;
  }

  toPresenter(domainEntity: User): UserResponse {
    return new UserResponse(domainEntity);
  }
}
