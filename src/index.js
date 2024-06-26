import filterLevels from './filterLevels.js'
import levels from './levels.js'
import combine from './log/index.js'
import codeUtils from './code/index.js'
import supportSumorError from './supportSumorError.js'

export default class Logger {
  constructor(options) {
    options = options || {}
    options.code = options.code || {}
    options.i18n = options.i18n || {}
    this._codeUtils = codeUtils(options)

    const displayedLevels = filterLevels(options.level || process.env.LOG_LEVEL)
    for (let i = 0; i < levels.length; i += 1) {
      const level = levels[i]
      if (displayedLevels.indexOf(level) === -1) {
        this[level] = function () {}
      } else {
        this[level] = function () {
          const logArray = combine(
            {
              offset: options.offset,
              level,
              scope: options.scope,
              id: options.id
            },
            supportSumorError(arguments, options.language || process.env.LANGUAGE || 'en-US')
          )
          console.log.apply(console, logArray)
        }
      }
    }
  }

  code(code, parameters) {
    const { level, message } = this._codeUtils(code, parameters)
    if (levels.indexOf(level) > -1) {
      this[level](message)
    } else {
      this.error(code, parameters)
    }
  }
}
