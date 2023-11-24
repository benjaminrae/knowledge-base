/* eslint-disable @typescript-eslint/naming-convention */
import * as dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const environment = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PG_HOST: z.string(),
  PG_PORT: z.number(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_DATABASE: z.string(),
  PUBLIC_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.number(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: Number(process.env.PG_PORT),
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DATABASE: process.env.PG_DATABASE,
  PUBLIC_URL: process.env.PUBLIC_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: Number(process.env.PORT),
};

const parsed = environment.safeParse(processEnv);

if (parsed.success === false) {
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== 'string') {
      return undefined;
    }

    return target[prop as keyof typeof target];
  },
});

export { env };
