const socketio = require('socket.io')
const players = require('./players')

const gameAccepted = (opponent, socket, io) => {
    let me = players.getIdlePlayerBySockID(socket.id)
    players.movePlayerFromIdleToBusy(opponent.socketID)
    players.movePlayerFromIdleToBusy(socket.id)
    io.to(opponent.socketID).emit('startingGame', me)
}

const enterAsIdlePlayer = (player, socket, io) => {
    if (!Object.keys(player).length) {
        return console.log('empty data packet')
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

const disconnect = (socket, io) => {
    const leavingPlayer = players.removePlayerBySockID(socket.id)
    if (leavingPlayer) {
        console.log(leavingPlayer.user.userName + " left the room")
        io.emit('idlePlayers', players.getIdlePlayers())
        io.to(socket.id).emit('leftRoom')
    }
}

module.exports = {
    gameAccepted,
    enterAsIdlePlayer,
    getIdlePlayers,
    disconnect
}