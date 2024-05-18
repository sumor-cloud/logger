export default (time, offset) => {
  let defaultOffset = -new Date().getTimezoneOffset()
  if (process.env.loggerTimeOffset) {
    defaultOffset = parseInt(process.env.loggerTimeOffset, 10)
  }
  if (offset === undefined || offset === null) {
    offset = defaultOffset
  }
  // format yyyy-mm-dd hh:mm:ss.SSS
  const date = new Date(time + offset * 60 * 1000)
  const year = date.getUTCFullYear()
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  const day = `0${date.getUTCDate()}`.slice(-2)
  const hours = `0${date.getUTCHours()}`.slice(-2)
  const minutes = `0${date.getUTCMinutes()}`.slice(-2)
  const seconds = `0${date.getUTCSeconds()}`.slice(-2)
  const milliseconds = `00${date.getUTCMilliseconds()}`.slice(-3)

  // get timezone string like Z or +0800 or -0800 or -0330
  const timezoneOffsetHour = Math.abs(offset) / 60
  const timezoneOffsetMinute = Math.abs(offset) % 60
  const timezoneOffsetFullTime =
    `0${Math.floor(timezoneOffsetHour)}`.slice(-2) +
    `0${Math.floor(timezoneOffsetMinute)}`.slice(-2)
  const timezoneOffsetFlag = offset > 0 ? '+' : '-'
  const timezoneOffsetString = offset === 0 ? 'Z' : `${timezoneOffsetFlag}${timezoneOffsetFullTime}`

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneOffsetString}`
}
