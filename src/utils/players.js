const idlePlayers = []
const busyPlayers = []

const addPlayer = (player) => {
    
    if (!player || !Object.keys(player).length) {
        return console.log('no player to add')
    }
    const index = idlePlayers.findIndex((listedUser) => {
        return player.user._id === listedUser.user._id
    })
    if (index !== -1) {
        console.log('already in list, at index: ', index)
        return null
    } else {
        console.log('adding user to list')
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
    let index = idlePlayers.findIndex((player) => {
        return player.socketID === socket
    })
    if (index === -1) {
        return false
    }
    return true
}

const removePlayerBySockID = (socket) => {
    let index = busyPlayers.findIndex((player) => {
        return player.socketID === socket
    })
    if (index !== -1) {
        console.log('removing from busy')
        return busyPlayers.splice(index, 1)[0]
    }
    
    index = idlePlayers.findIndex((player) => {
        return player.socketID === socket
    })
    if (index !== -1) {
        console.log('removing from idle')
        return idlePlayers.splice(index, 1)[0]
    }
}

const movePlayerFromIdleToBusy = (socket) => {
    let index = idlePlayers.findIndex((player) => {
        return player.socketID === socket
    })
    if (index !== -1) {
        console.log('removing from idle')
        const player = getIdlePlayerBySockID(socket)
        idlePlayers.splice(index, 1)[0]
        console.log('adding to busy')
        busyPlayers.push(player)
    } else {
        console.log('player not found')
    }
}

const movePlayerFromBusyToIdle = (socket) => {
    let index = busyPlayers.findIndex((player) => {
        return player.socketID === socket
    })
    if (index !== -1) {
        console.log('removing from busy')
        const player = getIdlePlayerBySockID(socket)
        busyPlayers.splice(index, 1)[0]
        console.log('adding to idle')
        idlePlayers.push(player)
    } else {
        console.log('player not found')
    }
}
const isLoggedIn = (userName) => {
    var index = idlePlayers.findIndex((player) => {
        return player.user.userName === userName
    })
    if (index !== -1) {
        return true
    }
    index = busyPlayers.findIndex((player) => {
        return player.user.userName === userName
    })
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