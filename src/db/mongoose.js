//change hardcoding to env.var

const mongoose = require('mongoose')

mongoose.connect(process.env.DB_DEV_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
