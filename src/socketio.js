const socketio = require('socket.io');
const players = require('./utils/players');

const initiateSocketio = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');
        socket.emit('hello', 'NODE JS server says connected') 

        socket.on('hello', (msg) => {
            console.log(msg)
        })

        socket.on('enterAsIdlePlayer', (user) => {
            if (!Object.keys(user).length) {
                return console.log('empty user', user)
            }
            players.addPlayer(user);
            io.emit('hello', {
                players: players.getIdlePlayers()
            });
        });

        socket.on('playerEnterChoosePlayers', (player) => {
            players.transferPlayerTo_NOT_PlayingNowList(player.id);

            io.emit('playersList', {
                players: players.getPlayersNotPlayingNowList()
            });
        });

        socket.on('choosePlayer', (opponent) => {
            const I_Player = players.getPlayer_FromNotPlayingList(socket.id);
            socket.broadcast.to(opponent.id).emit('choosedByPlayer', I_Player);
        });

        socket.on('agreeToPlay', (opponent, callback) => {
            const getRandomBoolean = () => {
                return Math.floor(Math.random() * Math.floor(1)) === 1 ? true : false;
            }
            const IIsBlue = getRandomBoolean();
            const opponentIsBlue = !IIsBlue;

            socket.broadcast.to(opponent.id).emit('opponentAgreedToPlay', opponentIsBlue);
            callback(IIsBlue);
            players.transferPlayerToPlayingNowList(opponent.id);
            players.transferPlayerToPlayingNowList(socket.id);

            io.emit('playersList', {
                players: players.getPlayersNotPlayingNowList()
            });
        });

        socket.on('dropData', (dropData) => {
            socket.broadcast.to(dropData.toPlayer.id).emit('getDropData', dropData);
        });

        socket.on('moveDone', (moveDoneData) => {
            socket.broadcast.to(moveDoneData.toPlayer.id).emit('getMoveDone', moveDoneData);
        });

        socket.on('ratingUpdate', (NewRating) => {
            players.updateRating(socket.id, NewRating);

            io.emit('playersList', {
                players: players.getPlayersNotPlayingNowList()
            });
        });

        socket.on('playerLeftTheGame', (opponent) => {
            if (opponent !== null) {
                console.log('player left game');
                socket.broadcast.to(opponent.id).emit('opponentLeftTheGame');
            }
        });

        socket.on('tie', (opponentId) => {
            if (opponentId) {
                socket.broadcast.to(opponentId).emit('tie');
            }
        });

        socket.on('disconnection', () => {
            const leavingPlayer = players.removePlayer(socket.id);

            if (leavingPlayer) {
                console.log(leavingPlayer.userName + " has left the building!");
                io.emit('playersList', {
                    players: players.getPlayersNotPlayingNowList()
                });
            }
        });

        socket.on('disconnect', () => {
            const leavingPlayer = players.removePlayer(socket.id);

            if (leavingPlayer) {
                console.log(leavingPlayer.userName + " has left the building!");
                io.emit('playersList', {
                    players: players.getPlayersNotPlayingNowList()
                });
            }
        });
    })
}

module.exports = initiateSocketio;
