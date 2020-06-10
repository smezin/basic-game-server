const mongoose = require('mongoose')
//change to localhost when running locally
mongoose.connect('mongodb://127.0.0.1:27017/game-users', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
