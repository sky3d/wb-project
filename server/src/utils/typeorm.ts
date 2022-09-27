import { createConnection, getConnection } from 'typeorm'
import { typeorm as config } from '../configs/typeorm'
// eslint-disable-next-line
import { RenkuApp, PluginInterface } from '../module'

const kMigration = 'typeorm'

export function typeorm(service: RenkuApp): PluginInterface {
  async function connect() {
    const connection = await createConnection({
      ...config,
    })

    service.addMigrator(kMigration, () => (
      connection.runMigrations()
    ))
  }

  async function close() {
    try {
      await getConnection().close()
    } catch (err) {
      service.log.debug({ err }, 'error')
    }
  }
  // async function migrate() {
  //   return service.migrate(kMigration)
  // }

  service.addConnector(kMigration, connect)
  service.addDestructor(kMigration, close)

  return {
    connect,
    close,
  }
}
