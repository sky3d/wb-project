import { Renku } from './main'

let instance: Renku | null = null

export async function start() {
  instance = new Renku()
  instance.start()
}
