import { env } from './env';
import { PostgresConfig } from './types';

export const pgDatabaseConfig: PostgresConfig = {
  type: 'postgres',
  host: env.PG_HOST,
  port: Number(env.PG_PORT),
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
};
