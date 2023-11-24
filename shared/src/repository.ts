import { type Either } from './either';
import { type ReadRepository } from './read-repository';
import { type UniqueEntityId } from './unique-entity-id';

export interface Repository<Entity> extends ReadRepository<Entity> {
  create(entity: Entity): Promise<Either<UniqueEntityId, Error>>;
  update(entity: Entity): Promise<Either<UniqueEntityId, Error>>;
  delete(entity: Entity): Promise<Either<UniqueEntityId, Error>>;
}
