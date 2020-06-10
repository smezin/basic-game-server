const app = require('./app')
const http = require('http')
const initateSocketio = require('./socketio')

const port = process.env.PORT || 3000

const server = http.createServer(app)
initateSocketio(server)

server.listen(port, () => {
    console.log("Listening on:", port)
})