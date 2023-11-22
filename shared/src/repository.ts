import { type ReadRepository } from './read-repository';

export interface Repository<Entity> extends ReadRepository<Entity> {
  create(entity: Entity): Promise<Entity>;
  update(entity: Entity): Promise<Entity>;
  delete(entity: Entity): Promise<Entity>;
}
