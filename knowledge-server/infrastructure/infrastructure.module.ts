import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './di/users/users.module';
import { datasourceOptions } from './persistence/typeorm/typeorm.datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    EventEmitterModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
