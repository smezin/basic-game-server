const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

app = express()
app.use(cors())
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

 app.use(express.static(publicDirectoryPath))

io.on('connection', (socket)=>{
    console.log('new web socket connection')
    socket.emit('packet', 'packet from server')

    socket.on('hello', (msg)=>{
        console.log(`im the server, got your "${msg}"`)
    })

 
    socket.on('disconnect', () => {
       console.log('byebye')
    })
})


server.listen(port, ()=>{
    console.log(`server is up on ${port}!`)
})