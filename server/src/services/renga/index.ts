import { Renga } from './renga'

let instance: Renga | null = null

export function renga(log: any, config: any) {
  instance = new Renga(log, config)

  return instance.start()
}

export function getRenga(): Renga | never {
  if (instance instanceof Renga) {
    return instance
  }

  throw new Error('renga is not initialized')
}
