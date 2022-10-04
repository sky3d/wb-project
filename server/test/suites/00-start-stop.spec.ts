import { init, stop } from '../helpers/common'
import { TestContext } from '../module'

describe('Renku App', () => {
  jest.setTimeout(50000)

  const ctx: TestContext = {}

  const start = init(ctx)
  const close = stop(ctx)

  it('start renku app', start)

  it('stops renku app', close)
})
