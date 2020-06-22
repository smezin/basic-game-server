require('dotenv').config()
const app = require('./app')
const http = require('http')
const initateSocketio = require('./socketio')
const {logger} = require('./winstonLogger')

const port = process.env.PORT || 3000

const server = http.createServer(app)
initateSocketio(server)

server.listen(port, () => {
    logger.log({
        level:'info',
        message:`Listening on ${port}`
    }) 
})