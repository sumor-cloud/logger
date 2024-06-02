import getLevelMapping from './getLevelMapping.js'
import getI18nConfig from './getI18nConfig.js'
import getI18n from '@sumor/i18n'

export default config => {
  const levelMapping = getLevelMapping(config.code)
  const i18nConfig = getI18nConfig(config)

  return (code, parameters) => {
    const level = levelMapping[code]
    if (level) {
      const i18n = getI18n(config.language || process.env.LANGUAGE || 'en-US', i18nConfig)
      const message = i18n(code, parameters)
      return {
        level,
        message
      }
    } else {
      return {}
    }
  }
}
