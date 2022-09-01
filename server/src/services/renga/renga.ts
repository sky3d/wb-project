import shortid from 'shortid'
import { Connection } from 'typeorm'
import { RengaStatus } from '../../interfaces'
import { StorageService } from '../storage'

export class Renga {
  public readonly config: any

  private readonly log: any

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

    const item = await this.storage.createRenga({
      id: shortid(),
      name: 'new draft renga',
      status: RengaStatus.Draft
    })
    // console.log(item)

    this.log.info('renga service initialized')
  }
}
