import { CreateUserCommandProps } from '@app/core';
import { Command, CommandProps } from '@knowledge-base/shared';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(props: CommandProps<CreateUserCommandProps>) {
    super(props);

    this.email = props.email;
    this.password = props.password;
  }
}
