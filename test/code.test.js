import { describe, expect, it } from '@jest/globals'
import getLevelMapping from '../src/code/getLevelMapping.js'
import codeUtils from '../src/code/index.js'

describe('code', () => {
  it('get level mapping', () => {
    const mapping = getLevelMapping({
      trace: {
        CODE11: 'code11',
        CODE12: 'code12'
      },
      debug: {
        CODE21: 'code21',
        CODE22: 'code22'
      },
      info: {
        CODE31: 'code31',
        CODE32: 'code32'
      },
      warn: {
        CODE41: 'code41',
        CODE42: 'code42'
      },
      error: {
        CODE51: 'code51',
        CODE52: 'code52'
      },
      fatal: {
        CODE61: 'code61',
        CODE62: 'code62'
      }
    })
    expect(mapping).toEqual({
      CODE11: 'trace',
      CODE12: 'trace',
      CODE21: 'debug',
      CODE22: 'debug',
      CODE31: 'info',
      CODE32: 'info',
      CODE41: 'warn',
      CODE42: 'warn',
      CODE51: 'error',
      CODE52: 'error',
      CODE61: 'fatal',
      CODE62: 'fatal'
    })
  })
  it('code utils', () => {
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
    const codeUtilsInstance = codeUtils({
      code,
      i18n,
      language: 'zh'
    })

    const result1 = codeUtilsInstance('HTTP_ACCESS', { ip: '102.131.21.233' })
    expect(result1).toEqual({
      level: 'trace',
      message: 'The user accesses via HTTP and the IP address is 102.131.21.233'
    })

    const result2 = codeUtilsInstance('USER_TOKEN_LOADED', { id: 'USER001' })
    expect(result2).toEqual({
      level: 'debug',
      message: 'The user login information is read and the user ID is USER001'
    })

    const result3 = codeUtilsInstance('USER_LOGIN', { id: 'USER001' })
    expect(result3).toEqual({
      level: 'info',
      message: '用户登录，用户ID为USER001'
    })

    const result4 = codeUtilsInstance('USER_LOGOUT', { id: 'USER001' })
    expect(result4).toEqual({
      level: 'warn',
      message: 'The user logs out and the user ID is USER001'
    })

    const result5 = codeUtilsInstance('USER_LOGIN_FAILED', { id: 'USER001' })
    expect(result5).toEqual({
      level: 'error',
      message: 'The user login failed and the user ID is USER001'
    })

    const result6 = codeUtilsInstance('USER_LOGIN_BLOCKED', { id: 'USER001' })
    expect(result6).toEqual({
      level: 'fatal',
      message: 'The user login is blocked and the user ID is USER001'
    })

    const result7 = codeUtilsInstance('UNKNOWN_CODE', { id: 'USER001' })
    expect(result7).toEqual({})
  })

  it('code utils with global language', () => {
    const code = {
      info: {
        USER_LOGIN: 'The user logs in and the user ID is {id}'
      }
    }
    const i18n = {
      zh: {
        USER_LOGIN: '用户登录，用户ID为{id}'
      }
    }
    const codeUtilsInstance = codeUtils({
      code,
      i18n
    })
    const result1 = codeUtilsInstance('USER_LOGIN', { id: 'USER001' })
    expect(result1.message).toBe('The user logs in and the user ID is USER001')

    process.env.LANGUAGE = 'zh'
    const result2 = codeUtilsInstance('USER_LOGIN', { id: 'USER001' })
    expect(result2.message).toBe('用户登录，用户ID为USER001')

    delete process.env.LANGUAGE

    const result3 = codeUtilsInstance('USER_LOGIN', { id: 'USER001' })
    expect(result3.message).toBe('The user logs in and the user ID is USER001')
  })
})
