const idlePlayers = [];
const busyPlayers = [];

const addPlayer = (player) => {
    
    if (!player || !Object.keys(player).length) {
        return console.log('no user to add', player)
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
};

const getIdlePlayers = () => {
    return idlePlayers
}

const getIdlePlayerBySockID = (socket) => {
    return idlePlayers.find((player) => player.socketID === socket)
}


const removePlayerBySockID = (socket) => {
    console.log('sokc', socket)
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




const transferPlayerToPlayingNowList = (id) => {
    const index = idlePlayers.findIndex((player) => {
        return player.id === id
    })

    if (index !== -1) {
        const player = idlePlayers.splice(index, 1)[0];
        busyPlayers.push(player)
    }
}

const transferPlayerTo_NOT_PlayingNowList = (id) => {
    const index = busyPlayers.findIndex((player) => {
        return player.id === id
    })

    if (index !== -1) {
        const player = busyPlayers.splice(index, 1)[0]
        idlePlayers.push(player)
    }
}




const getPlyersPlaying = () => {
    return busyPlayers
}

const updateRating = (id, newRating) => {
    let player = busyPlayers.find((player) => player.id === id)
    if (player) {
        player.rating = newRating
        return
    }

    player = idlePlayers.find((player) => player.id === id)
    if (player) {
        player.rating = newRating
        return
    }
}

module.exports = {
    addPlayer,
    removePlayerBySockID,
    getIdlePlayerBySockID,
    getIdlePlayers,
    transferPlayerTo_NOT_PlayingNowList,
    transferPlayerToPlayingNowList,
    getPlyersPlaying,
    updateRating
}