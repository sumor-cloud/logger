import { describe, expect, it } from '@jest/globals'

import filterLevels from '../src/filterLevels.js'
import Logger from '../src/index.js'
import supportSumorError from '../src/supportSumorError.js'

import defineError from '@sumor/error'

const LibraryError = defineError({
  code: {
    ERROR1: 'Error is {status}'
  },
  // languages: en, zh, es, ar, fr, ru, de, pt, ja, ko
  i18n: {
    zh: {
      ERROR1: '错误是{status}'
    }
  }
})

describe('entry', () => {
  it('filter levels', () => {
    const result1 = filterLevels('trace')
    expect(result1).toEqual(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])

    const result2 = filterLevels('debug')
    expect(result2).toEqual(['debug', 'info', 'warn', 'error', 'fatal'])

    const result3 = filterLevels('info')
    expect(result3).toEqual(['info', 'warn', 'error', 'fatal'])

    const result4 = filterLevels('warn')
    expect(result4).toEqual(['warn', 'error', 'fatal'])

    const result5 = filterLevels('error')
    expect(result5).toEqual(['error', 'fatal'])

    const result6 = filterLevels('fatal')
    expect(result6).toEqual(['fatal'])

    const result7 = filterLevels('none')
    expect(result7).toEqual([])

    const result8 = filterLevels()
    expect(result8).toEqual(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
  })
  it('default', () => {
    const logger = new Logger()
    logger.trace('Trace Demo')
    logger.debug('Debug Demo')
    logger.info('Info Demo')
    logger.warn('Warn Demo')
    logger.error('Error Demo')
    logger.fatal('Fatal Demo')
  })
  it('demo', () => {
    const scope = 'test'
    const id = 'USER001'
    const logger = new Logger({
      scope,
      offset: 0,
      level: 'trace',
      id
    })
    logger.trace('Trace Demo')
    logger.debug('Debug Demo')
    logger.info('Info Demo')
    logger.warn('Warn Demo')
    logger.error('Error Demo')
    logger.fatal('Fatal Demo')
  })
  it('exception', () => {
    const logger = new Logger({
      level: 'none'
    })
    expect(logger.trace()).toBe(undefined)
    const logger2 = new Logger({
      level: 'unknown'
    })
    expect(logger2.trace()).toBe(undefined)
  })
  it('code', () => {
    const code = {
      trace: {
        HTTP_ACCESS: 'The user accesses via HTTP and the IP address is {ip}'
      },
      debug: {
        USER_TOKEN_LOADED: 'The user login information is read and the user ID is {id}'
      },
      info: {
        USER_LOGIN: 'The user logs in and the user ID is {id}'
      },
      warn: {
        USER_LOGOUT: 'The user logs out and the user ID is {id}'
      },
      error: {
        USER_LOGIN_FAILED: 'The user login failed and the user ID is {id}'
      },
      fatal: {
        USER_LOGIN_BLOCKED: 'The user login is blocked and the user ID is {id}'
      }
    }
    const i18n = {
      zh: {
        USER_LOGIN: '用户登录，用户ID为{id}'
      }
    }
    const logger1 = new Logger({
      code,
      i18n
    })

    logger1.code('HTTP_ACCESS', { ip: '102.131.21.233' })
    logger1.code('USER_TOKEN_LOADED', { id: 'USER001' })
    logger1.code('USER_LOGIN', { id: 'USER001' })
    logger1.code('USER_LOGOUT', { id: 'USER001' })
    logger1.code('USER_LOGIN_FAILED', { id: 'USER001' })
    logger1.code('USER_LOGIN_BLOCKED', { id: 'USER001' })
    logger1.code('UNKNOWN_CODE', { id: 'USER001' })
  })

  it('support sumor error', () => {
    const error = new LibraryError('ERROR1', { status: 'network_error' })
    expect(error.message).toEqual('Error is network_error')
    const args = supportSumorError([error], 'zh-CN')
    expect(args[0].message).toEqual('错误是network_error')

    const logger = new Logger()
    process.env.LANGUAGE = 'en'
    logger.error('Demo for support sumor error:', error)
    process.env.LANGUAGE = 'zh-CN'
    logger.error('支持sumor错误的演示：', error)
  })
})
