import { RenkuApp } from '../../module'
import { Renga } from './renga'

let instance: Renga | null = null

export function renga(parent: RenkuApp) {
  async function connect() {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    instance = parent.renga = new Renga(parent)
  }

  // eslint-disable-next-line require-await
  async function close() {
    instance = null
  }

  parent.addConnector(Renga.kName, connect)
  parent.addDestructor(Renga.kName, close)

  return {
    connect,
    close,
  }
}

export function getRenga(): Renga | never {
  if (instance instanceof Renga) {
    return instance
  }

  throw new Error('renga is not initialized')
}
