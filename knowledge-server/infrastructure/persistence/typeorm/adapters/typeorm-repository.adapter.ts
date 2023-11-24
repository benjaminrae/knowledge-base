import {
  AggregateRoot,
  Either,
  EventEmitter,
  Logger,
  Mapper,
  Repository,
  UniqueEntityId,
  failure,
  success,
} from '@knowledge-base/shared';
import { DataSource } from 'typeorm';
import { TypeormReadRepositoryAdapter } from './typeorm-read-repository.adapter';

export abstract class TypeormRepositoryAdapter<
    DomainEntity extends AggregateRoot<unknown>,
    PersistedModel extends object,
  >
  extends TypeormReadRepositoryAdapter<DomainEntity, PersistedModel>
  implements Repository<DomainEntity>
{
  abstract table: string;

  constructor(
    protected readonly datasource: DataSource,
    protected readonly mapper: Mapper<DomainEntity, PersistedModel>,
    protected readonly eventEmitter: EventEmitter,
    protected readonly logger: Logger,
  ) {
    super(datasource, mapper);
  }

  async create(entity: DomainEntity): Promise<Either<UniqueEntityId, Error>> {
    const model = this.mapper.toPersistence(entity);

    try {
      const insertResult = await this.createQueryBuilder()
        .insert()
        .into(this.table)
        .values(model)
        .execute();

      const persistedModel = insertResult.generatedMaps[0];

      entity.publishEvents(this.logger, this.eventEmitter);

      return success(new UniqueEntityId(persistedModel.id));
    } catch (error) {
      return failure(error);
    }
  }

  async update(entity: DomainEntity): Promise<Either<UniqueEntityId, Error>> {
    const model = this.mapper.toPersistence(entity);

    const updateResult = await this.createQueryBuilder()
      .update(this.table)
      .where('id = :id', { id: entity.id })
      .set(model)
      .execute();

    const persistedModel = updateResult.generatedMaps[0];

    entity.publishEvents(this.logger, this.eventEmitter);

    return success(new UniqueEntityId(persistedModel.id));
  }

  async delete(entity: DomainEntity): Promise<Either<UniqueEntityId, Error>> {
    await this.datasource.query(
      `DELETE FROM ${this.table} WHERE id = $1 RETURNING *`,
      [entity.id],
    );

    entity.publishEvents(this.logger, this.eventEmitter);

    return success(new UniqueEntityId(entity.id));
  }

  createQueryBuilder() {
    const queryBuilder = this.datasource.createQueryBuilder();

    return queryBuilder;
  }
}
