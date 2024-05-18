// filter levels which are below the given level
import levels from './levels.js'
export default level => {
  level = (level || 'trace').toLowerCase()
  const index = levels.indexOf(level)
  return index === -1 ? [] : levels.slice(index)
}
