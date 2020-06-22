const players = require('./players')
const winston = require('../winstonLogger')
const logger = winston.logger
const allowMultipleGaming = true

const gameAccepted = (opponent, gameID, socket, io) => {
    let me = players.getIdlePlayerBySocket(socket)
    if (!allowMultipleGaming) {
        players.movePlayerFromIdleToBusy(opponent.socketID)
        players.movePlayerFromIdleToBusy(socket.id)
    }
    io.to(opponent.socketID).emit('startingGame', me, gameID)
}
const enterAsIdlePlayer = (player, socket, io) => {
    if (!Object.keys(player).length) {
        logger.log({
            level: 'warn',
            message: `recieved empty data packet`
        })  
        return
    }
    player.socketID = socket.id
    if (players.addPlayer(player)) {
        io.to(socket.id).emit('enteredRoom')
    }
    io.emit('idlePlayers', players.getIdlePlayers())
}

const getIdlePlayers = (player, io) => {
    io.to(player.socketID).emit('idlePlayers', players.getIdlePlayers())
}
const exitRoom = (socket, io) => {
    const leavingPlayer = players.removePlayerBySocket(socket)
    if (leavingPlayer) {
        logger.log({
            level: 'info',
            message: `${leavingPlayer.user.userName} left the room`
        })  
        io.emit('idlePlayers', players.getIdlePlayers())
        io.to(socket.id).emit('leftRoom')
    }
}
const offerGame = (opponent, socket, io) => {
    let me = players.getIdlePlayerBySocket(socket)
    io.to(opponent.socketID).emit('letsPlay', me)
}
const gameDeclined = (opponent, socket, io) => {
    let me = players.getIdlePlayerBySocket(socket)
    io.to(opponent.socketID).emit('noGame', me)
}
const boardData = (opponent, gameID, board, io) => {
    io.to(opponent.socketID).emit('gameMove', board, gameID)
}
const iLost = (opponent, gameID, io) => {
    io.to(opponent.socketID).emit('youWon', gameID)
}
const iWon = (opponent, gameID, io) => {
    io.to(opponent.socketID).emit('youLost', gameID)
}

module.exports = {
    gameAccepted,
    enterAsIdlePlayer,
    getIdlePlayers,
    exitRoom,
    offerGame,
    gameDeclined,
    boardData,
    iLost,
    iWon
}