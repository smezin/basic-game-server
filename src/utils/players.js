const idlePlayers = [];
const busyPlayers = [];

const addPlayer = (user) => {
    
    if (!user || !Object.keys(user).length) {
        return console.log('no user to add', user)
    }
    const index = idlePlayers.findIndex((listedUser) => {
        return user.userName === listedUser.userName
    })
    if (index !== -1) {
        console.log('already in list')
        return null
    } else {
        console.log('adding user to list')
        idlePlayers.push(user)
    }
    return user;
};

const removePlayer = (id) => {
    let index = busyPlayers.findIndex((player) => {
        return player.id === id
    });

    if (index !== -1) {
        return busyPlayers.splice(index, 1)[0]
    }

    index = idlePlayers.findIndex((player) => {
        return player.id === id
    });

    if (index !== -1) {
        return idlePlayers.splice(index, 1)[0]
    }
}

const transferPlayerToPlayingNowList = (id) => {
    const index = idlePlayers.findIndex((player) => {
        return player.id === id
    })

    if (index !== -1) {
        const player = idlePlayers.splice(index, 1)[0];
        busyPlayers.push(player);
    }
}

const transferPlayerTo_NOT_PlayingNowList = (id) => {
    const index = busyPlayers.findIndex((player) => {
        return player.id === id;
    })

    if (index !== -1) {
        const player = busyPlayers.splice(index, 1)[0];
        idlePlayers.push(player);
    }
}

const getPlayer_FromNotPlayingList = (id) => {
    return idlePlayers.find((player) => player.id === id);
}

const getIdlePlayers = () => {
    return idlePlayers.slice();
}

const getPlyersPlaying = () => {
    return busyPlayers;
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
    removePlayer,
    getPlayer_FromNotPlayingList,
    getIdlePlayers,
    transferPlayerTo_NOT_PlayingNowList,
    transferPlayerToPlayingNowList,
    getPlyersPlaying,
    updateRating
}