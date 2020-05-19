const playersNotPlayingNow = [];
const playersPlayingNow = [];

const addPlayer = ({ id, userName, rating, userId }) => {
    userName = userName.trim();

    const player = { id, userName, rating, userId };
    playersNotPlayingNow.push(player);
    return player;
};

const removePlayer = (id) => {
    let index = playersPlayingNow.findIndex((player) => {
        return player.id === id;
    });

    if (index !== -1) {
        return playersPlayingNow.splice(index, 1)[0];
    }

    index = playersNotPlayingNow.findIndex((player) => {
        return player.id === id;
    });

    if (index !== -1) {
        return playersNotPlayingNow.splice(index, 1)[0];
    }
}

const transferPlayerToPlayingNowList = (id) => {
    const index = playersNotPlayingNow.findIndex((player) => {
        return player.id === id;
    })

    if (index !== -1) {
        const player = playersNotPlayingNow.splice(index, 1)[0];
        playersPlayingNow.push(player);
    }
}

const transferPlayerTo_NOT_PlayingNowList = (id) => {
    const index = playersPlayingNow.findIndex((player) => {
        return player.id === id;
    })

    if (index !== -1) {
        const player = playersPlayingNow.splice(index, 1)[0];
        playersNotPlayingNow.push(player);
    }
}

const getPlayer_FromNotPlayingList = (id) => {
    return playersNotPlayingNow.find((player) => player.id === id);
}

const getPlayersNotPlayingNowList = () => {
    return playersNotPlayingNow.slice();
}

const getPlyersPlaying = () => {
    return playersPlayingNow;
}

const updateRating = (id, newRating) => {
    let player = playersPlayingNow.find((player) => player.id === id);
    if (player) {
        player.rating = newRating;
        return;
    }

    player = playersNotPlayingNow.find((player) => player.id === id);
    if (player) {
        player.rating = newRating;
        return;
    }
}

module.exports = {
    addPlayer,
    removePlayer,
    getPlayer_FromNotPlayingList,
    getPlayersNotPlayingNowList,
    transferPlayerTo_NOT_PlayingNowList,
    transferPlayerToPlayingNowList,
    getPlyersPlaying,
    updateRating
}