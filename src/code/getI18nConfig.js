export default config => {
  const origin = {}
  for (const level in config.code) {
    for (const code in config.code[level]) {
      origin[code] = config.code[level][code]
    }
  }
  return {
    origin,
    ...config.i18n
  }
}
