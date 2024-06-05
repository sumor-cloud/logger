export default (args, language) => {
  for (const i in args) {
    if (args[i] instanceof Error && typeof args[i].json === 'function') {
      args[i].language = language
    }
  }
  return args
}
