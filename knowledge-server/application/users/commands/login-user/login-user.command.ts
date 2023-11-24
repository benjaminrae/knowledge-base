import { LoginUserCommandProps } from '@app/core';
import { Command, CommandProps } from '@knowledge-base/shared';

export class LoginUserCommand extends Command {
  readonly email: string;
  readonly password: string;

  constructor(props: CommandProps<LoginUserCommandProps>) {
    super(props);

    this.email = props.email;
    this.password = props.password;
  }
}
