export type DatasourceConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type PostgresConfig = DatasourceConfig & {
  type: 'postgres';
};
