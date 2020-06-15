const express = require('express')
const { handleError } = require('./middleware/errorHandler')

require('./db/mongoose')
const userRouter = require('./routers/users')

const app = express()
app.use(express.json())
app.use(userRouter)
app.use((err, req, res, next) => {
    handleError(err, res)
})

module.exports = app