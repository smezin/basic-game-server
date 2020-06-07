const mongoose = require('mongoose')
//mongodb://mongo:27017/
mongoose.connect('mongodb://mongo/game-users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
