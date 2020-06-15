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
    console.log('\n\nfrom hanleError:', message, statusCode)
    logger.log({
        level:'error',
        message
    })
    if (res) {
      console.log('-----response-----', statusCode)
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
  
  