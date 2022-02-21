import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

import path from 'path'

export type TypeormConfig = PostgresConnectionOptions

const models = path.resolve(__dirname, '../models')
const migrations = path.resolve(__dirname, '../migrations')

export const typeorm: TypeormConfig = {
  type: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  entities: [`${models}/**/*`],
  migrations: [`${migrations}/**/*`],
  synchronize: false,
}
