import { Renku } from '../../main'
import { User } from './user'

let instance: User | null = null

export function user(parent: Renku) {
  async function connect() {
    // eslint-disable-next-line no-param-reassign, no-multi-assign
    instance = parent.user = new User(parent)
  }

  // eslint-disable-next-line require-await
  async function close() {
    instance = null
  }

  parent.addConnector(User.kName, connect)
  parent.addDestructor(User.kName, close)

  return {
    connect,
    close,
  }
}

export function getUser(): User | never {
  if (instance instanceof User) {
    return instance
  }

  throw new Error('user is not initialized')
}
