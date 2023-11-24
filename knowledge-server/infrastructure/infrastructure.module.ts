import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './di/users/users.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule, EventEmitterModule.forRoot(), UsersModule],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
