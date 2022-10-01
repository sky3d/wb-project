import { Renku } from '../../main'
import { Variant } from './variant'

let instance: Variant | null = null

export function variant(parent: Renku) {
  async function connect() {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    instance = parent.variant = new Variant(parent)
  }

  // eslint-disable-next-line require-await
  async function close() {
    instance = null
  }

  parent.addConnector(Variant.kName, connect)
  parent.addDestructor(Variant.kName, close)

  return {
    connect,
    close,
  }
}

export function getVariant(): Variant | never {
  if (instance instanceof Variant) {
    return instance
  }

  throw new Error('variant is not initialized')
}
