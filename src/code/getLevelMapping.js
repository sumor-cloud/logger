export default config => {
  const mapping = {}
  for (const level in config) {
    for (const code in config[level]) {
      mapping[code] = level
    }
  }
  return mapping
}
