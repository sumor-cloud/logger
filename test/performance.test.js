import { describe, expect, it } from '@jest/globals'

import Logger from '../src/index.js'

const times = 3000
const disable = true
describe('Performance', () => {
  it(`try ${times} times`, () => {
    const scope = 'test'
    const id = 'USER001'
    const logger = new Logger({
      scope,
      offset: 0,
      level: disable ? 'info' : 'trace',
      id
    })

    const startTime = Date.now()
    for (let i = 0; i < times; i++) {
      logger.trace('HELLO')
    }
    const endTime = Date.now()
    expect(endTime - startTime).toBeLessThan(1000)
  })
})
