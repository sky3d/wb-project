import { RenkuApp } from '../../module'
import { Verse } from './verse'

let instance: Verse | null = null

export function verse(parent: RenkuApp) {
  async function connect() {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    instance = parent.verse = new Verse(parent)
  }

  // eslint-disable-next-line require-await
  async function close() {
    instance = null
  }

  parent.addConnector(Verse.kName, connect)
  parent.addDestructor(Verse.kName, close)

  return {
    connect,
    close,
  }
}

export function getVerse(): Verse | never {
  if (instance instanceof Verse) {
    return instance
  }

  throw new Error('verse is not initialized')
}
