const events = require('./utils/events')
const socketio = require('socket.io')
const players = require('./utils/players')
const {logger} = require('./winstonLogger')

const initiateSocketio = (server) => {
    const io = socketio(server)
    
    io.on('connection', (socket) => {
        logger.log ({
            level:'info',
            message:`new web socket connection ${socket.id}`
        })
        io.to(socket.id).emit('idlePlayers', players.getIdlePlayers())
        //pre-game
        socket.on('enterAsIdlePlayer', (player) => events.enterAsIdlePlayer(player, socket, io))
        socket.on('getIdlePlayers', (player) => events.getIdlePlayers(player, io))
        socket.on('exitRoom', () => events.exitRoom(socket, io))
        socket.on('offerGame', (opponent) => events.offerGame(opponent, socket, io))       
        socket.on('gameAccepted', (opponent, gameID) => events.gameAccepted(opponent, gameID, socket, io))
        socket.on('gameDeclined', (opponent) => events.gameDeclined(opponent, socket, io))
        //in-game
        socket.on('boardData', (opponent, board, gameID) => events.boardData(opponent, gameID, board, io))
        socket.on('iLost', (opponent, gameID) => events.iLost(opponent, gameID, io))
        socket.on('iWon', (opponent, gameID) => events.iWon(opponent, gameID, io))  
    })
}

module.exports = initiateSocketio
