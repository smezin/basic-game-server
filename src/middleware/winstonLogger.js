const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
    defaultMeta: { service: 'checkers-server' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
    ]
  })
 
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }))
  }
  const levels = { 
    error: 0, 
    warn: 1, 
    info: 2, 
  }
  module.exports = {
      logger,
      levels
  }