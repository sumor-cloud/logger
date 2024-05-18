import formatPrefix from './formatPrefix.js'
import colorful from './colorful.js'

export default ({ offset, level, scope, id }, args) => {
  const time = Date.now()

  const prefix = formatPrefix({
    time,
    offset,
    level,
    scope,
    id
  })
  const logArray = [colorful(level, prefix)]
  for (let j = 0; j < args.length; j += 1) {
    logArray.push(args[j])
  }
  return logArray
}
