import { Renku } from '../../src/main'
import { TestContext } from '../module'

export function init(ctx: TestContext, opts = {}) {
  return async (): Promise<void> => {
    ctx.service = new Renku(opts)
    await ctx.service.start()
  }
}

export function stop(ctx: TestContext) {
  return async (): Promise<void> => {
    await ctx.service?.close()
    ctx.service = undefined
  }
}
