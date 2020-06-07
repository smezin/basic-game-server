const mongoose = require('mongoose')
//mongodb://mongo:27017/
mongoose.connect('mongodb://mongo:27017/game-users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
