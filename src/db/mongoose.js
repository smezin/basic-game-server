const mongoose = require('mongoose')
//change to localhost when running locally
mongoose.connect('mongodb://mongo:27017/game-users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
