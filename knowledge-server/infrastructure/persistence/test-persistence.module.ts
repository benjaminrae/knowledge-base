import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
      logging: false,
      dropSchema: true,
    }),
  ],
})
export class TestPersistenceModule {}
