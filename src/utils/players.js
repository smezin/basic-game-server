
let idlePlayersMap = new Map
let busyPlayersMap = new Map
//
const {logger} = require('../winstonLogger')

const addPlayer = (player) => { 
    if (!player || !Object.keys(player).length) {
        logger.log ({
            level:'warn',
            message:'no player to add'
        })
        return 
    }
    if (idlePlayersMap.has(player.socketID)) {
        return player
    } else {
        logger.log ({
            level:'info',
            message:`adding ${player.user.userName} to idle players`
        })
        idlePlayersMap.set(player.socketID, player)
    }
    return player
}

const getIdlePlayers = () => {
    return Array.from(idlePlayersMap.values())
}

const getIdlePlayerBySocket = (socket) => {
    return idlePlayersMap.get(socket.id)
}

const isIdInRoom = (socket) => {
    if (idlePlayersMap.get(socket.id)) {
        return true
    }
    return false
}

const removePlayerBySocket = (socket) => {
    if (idlePlayersMap.has(socket.id)) {
        let player = idlePlayersMap.get(socket.id)
        idlePlayersMap.delete(socket.id)
        return player
    }
    if (busyPlayersMap.has(socket.id)) {
        let player = busyPlayersMap.get(socket.id)
        busyPlayersMap.delete(socket.id)
        return player
    }
}

const movePlayerFromIdleToBusy = (socketID) => {

    let player = idlePlayersMap.get(socketID)
    if (player) {
        busyPlayersMap.set(socketID, player)
        idlePlayersMap.delete(socketID)
    } else {
        logger.log ({
            level:'warn',
            message:'movePlayerFromIdleToBusy did not find player to move'
        })
    }
}

const movePlayerFromBusyToIdle = (socketID) => {

    let player = busyPlayersMap.get(socketID)
    if (player) {
        idlePlayersMap.set(socketID, player)
        busyPlayersMap.delete(socketID)
    } else {
        logger.log ({
            level:'warn',
            message:'movePlayerFromBusyToIdle did not find player to move'
        })
    }
}

module.exports = {
    addPlayer,
    removePlayerBySocket,
    getIdlePlayerBySocket,
    getIdlePlayers,
    movePlayerFromIdleToBusy,
    movePlayerFromBusyToIdle,
    isIdInRoom,
}