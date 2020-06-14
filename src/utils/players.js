//change arrys to maps
const idlePlayers = []
const busyPlayers = []
//
const {logger} = require('../middleware/winstonLogger')

const addPlayer = (player) => { 
    if (!player || !Object.keys(player).length) {
        logger.log ({
            level:'warn',
            message:'no player to add'
        })
        return 
    }
    const index = idlePlayers.findIndex((listedUser) => player.user._id === listedUser.user._id)
    if (index !== -1) {
        return player
    } else {
        logger.log ({
            level:'info',
            message:`adding ${player.user.userName} to idle players`
        })
        idlePlayers.push(player)
    }
    return player
}

const getIdlePlayers = () => {
    return idlePlayers
}

const getIdlePlayerBySockID = (socket) => {
    return idlePlayers.find((player) => player.socketID === socket)
}

const isIdInRoom = (socket) => {
    let index = idlePlayers.findIndex((player) => player.socketID === socket)
    if (index === -1) {
        return false
    }
    return true
}

const removePlayerBySockID = (socket) => {
    var index = busyPlayers.findIndex((player) => player.socketID === socket)
    if (index !== -1) {
        return busyPlayers.splice(index, 1)[0]
    }
    
    index = idlePlayers.findIndex((player) => player.socketID === socket)
    if (index !== -1) {
        return idlePlayers.splice(index, 1)[0]
    }
}

const movePlayerFromIdleToBusy = (socket) => {
    let index = idlePlayers.findIndex((player) => player.socketID === socket)
    if (index !== -1) {
        const player = getIdlePlayerBySockID(socket)
        idlePlayers.splice(index, 1)[0]
        busyPlayers.push(player)
    } else {
        logger.log ({
            level:'warn',
            message:'movePlayerFromIdleToBusy did not find player to move'
        })
    }
}

const movePlayerFromBusyToIdle = (socket) => {
    let index = busyPlayers.findIndex((player) => player.socketID === socket)
    if (index !== -1) {
        const player = getIdlePlayerBySockID(socket)
        busyPlayers.splice(index, 1)[0]
        idlePlayers.push(player)
    } else {
        logger.log ({
            level:'warn',
            message:'movePlayerFromBusyToIdle did not find player to move'
        })
    }
}
const isLoggedIn = (userName) => {
    var index = idlePlayers.findIndex((player) => player.user.userName.localeCompare(userName) === 0)
    if (index !== -1) {
        return true
    }
    index = busyPlayers.findIndex((player) => player.user.userName.localeCompare(userName) === 0)
    if (index !== -1) {
        return true
    }
    return false
}

module.exports = {
    addPlayer,
    removePlayerBySockID,
    getIdlePlayerBySockID,
    getIdlePlayers,
    movePlayerFromIdleToBusy,
    movePlayerFromBusyToIdle,
    isIdInRoom,
    isLoggedIn  
}