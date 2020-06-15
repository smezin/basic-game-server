const {logger} = require('../winstonLogger')

class ErrorHandler extends Error {
    constructor(statusCode, message, ...params) {
      super(...params)
      this.statusCode = statusCode
      this.message = message
    }
  }
  const handleError = (err, res) => {
    const { statusCode, message } = err
    logger.log({
        level:'error',
        message:`statusCode:${statusCode} description: ${message}`
    })
    if (res) {
      res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
      })  
    }
  }
  
  module.exports = {
    ErrorHandler,
    handleError
  }
  
  