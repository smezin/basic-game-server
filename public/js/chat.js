const socket = io()

//options

socket.on('connect', (message) => {
    console.log('im the client, hello')
    socket.emit('hello', 'Im connected')
    })

