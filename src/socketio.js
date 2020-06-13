const events = require('./utils/events')
const socketio = require('socket.io')
const players = require('./utils/players')

const initiateSocketio = (server) => {
    const io = socketio(server)

    io.on('connection', (socket) => {
        console.log('New WebSocket connection ', socket.id)

        io.to(socket.id).emit('idlePlayers', players.getIdlePlayers())

        socket.on('enterAsIdlePlayer', (player) => events.enterAsIdlePlayer(player, socket, io))
        socket.on('getIdlePlayers', (player) => events.getIdlePlayers(player, io))
        socket.on('disconnect', () => events.disconnect(socket, io))
       

        socket.on('offerGame', (opponent) => {
            let me = players.getIdlePlayerBySockID(socket.id)
            io.to(opponent.socketID).emit('letsPlay', me)
        })
       
        socket.on('gameAccepted', (opponent) => events.gameAccepted(opponent, socket, io))

        socket.on('gameDeclined', (opponent) => {
            let me = players.getIdlePlayerBySockID(socket.id)
            io.to(opponent.socketID).emit('noGame', me)
        })
        socket.on('boardData', (opponent, board) => {
            console.log('got the board from ', opponent)
            io.to(opponent.socketID).emit('gameMove', board)
        })
        socket.on('iLost', (opponent) => {
            io.to(opponent.socketID).emit('youWon')
        })
        socket.on('iWon', (opponent) => {
            io.to(opponent.socketID).emit('youLost')
        })
        
    })
}

module.exports = initiateSocketio
