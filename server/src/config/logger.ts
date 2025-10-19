import winston from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  return env === 'development' ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}
winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info
    const metaString = Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : ''

    if (metaString && metaString !== '{}') {
      return `${timestamp} ${level}: ${message} \n${metaString}`
    }
    return `${timestamp} ${level}: ${message}`
  })
)

const transports = [
  new winston.transports.Console({
    level: 'debug'
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'warn',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  })
]

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

export default logger
