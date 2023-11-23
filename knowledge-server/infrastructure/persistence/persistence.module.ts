import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './typeorm/typeorm.datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class PersistenceModule {}
