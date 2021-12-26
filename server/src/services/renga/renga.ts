export class Renga {
  public readonly config: any

  private readonly log: any

  constructor(log: any, config: any) {
    this.log = log
    this.config = config
  }

  public ping = () => 'pong'

  start() {
    this.log.info('renga service initialized')
  }
}
