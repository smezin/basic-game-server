const socketio = require('socket.io')
const players = require('./utils/players')

const initiateSocketio = (server) => {
    const io = socketio(server)

    io.on('connection', (socket) => {
        console.log('New WebSocket connection ', socket.id)
        io.to(socket.id).emit('idlePlayers', players.getIdlePlayers())

        socket.on('enterAsIdlePlayer', (user) => {
            if (!Object.keys(user).length) {
                return console.log('empty data packet')
            }
            user.socketID = socket.id
            if (players.addPlayer(user)) {
                io.to(socket.id).emit('enteredRoom')
            }
            io.emit('idlePlayers', players.getIdlePlayers())
        })
        socket.on('getIdlePlayers', (player) => {
            io.to(player.socketID).emit('idlePlayers', players.getIdlePlayers())
        })
        socket.on('disconnect', () => {
            const leavingPlayer = players.removePlayerBySockID(socket.id)
            if (leavingPlayer) {
                console.log(leavingPlayer.user.userName + " left the room")
                io.emit('idlePlayers', players.getIdlePlayers())
                io.to(socket.id).emit('leftRoom')
            }
        })
        socket.on('offerGame', (opponent) => {
            let me = players.getIdlePlayerBySockID(socket.id)
            io.to(opponent.socketID).emit('letsPlay', me)
        })
        socket.on('gameAccepted', (opponent) => {
            let me = players.getIdlePlayerBySockID(socket.id)
            players.movePlayerFromIdleToBusy(opponent.socketID)
            players.movePlayerFromIdleToBusy(socket.id)
            io.to(opponent.socketID).emit('startingGame', me)
        })
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
