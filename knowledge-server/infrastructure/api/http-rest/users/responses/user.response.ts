import { User } from '@app/core';

export class UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(user: User) {
    const props = user.getProps();

    this.id = user.id;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }
}
