import { BcryptPasswordService } from '@app/application';
import { CreateUserHttpController } from '@app/infrastructure/api/http-rest/users/controllers/commands/create-user.http.controller';
import { LoginUserHttpController } from '@app/infrastructure/api/http-rest/users/controllers/commands/login-user.http.controller';
import { NestCreateUserCommandHandler } from '@app/infrastructure/di/users/handlers/nest-create-user-command.handler';
import { NestLoginUserCommandHandler } from '@app/infrastructure/di/users/handlers/nest-login-user-command.handler';
import { UsersKeys } from '@app/infrastructure/di/users/users.keys';
import { UserCredentialsMapper } from '@app/infrastructure/persistence/users/mappers/user-credentials.mapper';
import { UserMapper } from '@app/infrastructure/persistence/users/mappers/user.mapper';
import { UserModel } from '@app/infrastructure/persistence/users/models/user.model';
import { UserCredentialsReadRepository } from '@app/infrastructure/persistence/users/repositories/user-credentials-read.repository';
import { UserCredentialsRepository } from '@app/infrastructure/persistence/users/repositories/user-credentials.repository';
import { UserReadRepository } from '@app/infrastructure/persistence/users/repositories/user-read.repository';
import { UserRepository } from '@app/infrastructure/persistence/users/repositories/user.repository';
import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

const repositories: Provider[] = [
  {
    provide: UsersKeys.USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: UsersKeys.USER_READ_REPOSITORY,
    useClass: UserReadRepository,
  },
  {
    provide: UsersKeys.USER_CREDENTIALS_REPOSITORY,
    useClass: UserCredentialsRepository,
  },
  {
    provide: UsersKeys.USER_CREDENTIALS_READ_REPOSITORY,
    useClass: UserCredentialsReadRepository,
  },
];

const httpControllers = [CreateUserHttpController, LoginUserHttpController];

const mappers: Provider[] = [
  {
    provide: UsersKeys.USER_MAPPER,
    useClass: UserMapper,
  },
  {
    provide: UsersKeys.USER_CREDENTIALS_MAPPER,
    useClass: UserCredentialsMapper,
  },
];

const services: Provider[] = [
  {
    useClass: BcryptPasswordService,
    provide: UsersKeys.PASSWORD_SERVICE,
  },
];

const commandHandlers: Provider[] = [
  NestCreateUserCommandHandler,
  NestLoginUserCommandHandler,
];

const queryHandlers: Provider[] = [];

@Module({
  imports: [TypeOrmModule.forFeature([UserModel]), CqrsModule, AuthModule],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...services,
    ...mappers,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UsersModule {}
