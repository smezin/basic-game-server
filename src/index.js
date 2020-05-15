const http = require('http')
const express = require('express')
const socketio = require('socket.io')

app = express()
const server = http.createServer(app)
const io = socketio(server);

const port = process.env.PORT || 3000

io.on('connection', (socket)=>{
    console.log('new web socket connection')
    socket.emit('hello', 'welcome')

    socket.on('hello', (msg)=>{
        console.log(`im the server, got your "${msg}"`)
    })

    socket.on('disconnect', () => {
       console.log('byebye')
    })
})
app.get('/', (req, res) => res.send('Hello World!'))


server.listen(port, ()=>{
    console.log(`server is up on ${port}!`)
})