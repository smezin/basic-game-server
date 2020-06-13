const events = require('./utils/events')
const socketio = require('socket.io')
const players = require('./utils/players')

const initiateSocketio = (server) => {
    const io = socketio(server)
    //refactor to sub funcs in different file
    io.on('connection', (socket) => {
        console.log('New WebSocket connection ', socket.id)

        io.to(socket.id).emit('idlePlayers', players.getIdlePlayers())

        socket.on('enterAsIdlePlayer', (player) => events.enterAsIdlePlayer(player, socket, io))
        socket.on('getIdlePlayers', (player) => events.getIdlePlayers(player, io))
        socket.on('disconnect', () => events.disconnect(socket, io))
        socket.on('offerGame', (opponent) => events.offerGame(opponent, socket, io))       
        socket.on('gameAccepted', (opponent) => events.gameAccepted(opponent, socket, io))
        socket.on('gameDeclined', (opponent) => events.gameDeclined(opponent, socket, io))
        socket.on('boardData', (opponent, board) => events.boardData(opponent, board, io))
        socket.on('iLost', (opponent) => events.iLost(opponent, io))
        socket.on('iWon', (opponent) => events.iWon(opponent, io))  
    })
}

module.exports = initiateSocketio
