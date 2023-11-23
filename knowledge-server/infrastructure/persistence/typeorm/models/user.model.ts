import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity(UsersKeys.USER_TABLE)
export class UserModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar', {
    nullable: true,
  })
  first_name: string;

  @Column('varchar', {
    nullable: true,
  })
  last_name: string;
}
