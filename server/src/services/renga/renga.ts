import { Connection } from 'typeorm'

import { StorageService } from '../storage'

export class Renga {
  public readonly config: any

  public readonly log: any

  private db: Connection

  public storage: StorageService

  constructor(log: any, config: any) {
    this.log = log
    this.config = config

    this.storage = new StorageService()
  }

  public ping = () => 'pong'

  async start() {
    await this.storage.connect()

    this.log.info('db connected')

    this.log.info('renga service initialized')
  }
}
