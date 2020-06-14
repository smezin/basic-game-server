const {logger} = require('./src/middleware/winstonLogger')

process.on('uncaughtException', (error) => {
    error.message += ' (uncaughtException)'
    logger.log({
        level:'error',
        message: error
    })
})