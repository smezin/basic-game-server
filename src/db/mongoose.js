const mongoose = require('mongoose')

mongoose.connect('mongodb://mongo:27017/game-users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
