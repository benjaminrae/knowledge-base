import { PasswordService } from '@app/core';
import { compare, genSalt, hash } from 'bcryptjs';

export class BcryptPasswordService implements PasswordService {
  constructor(private readonly rounds: number = 10) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.rounds);

    return await hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
