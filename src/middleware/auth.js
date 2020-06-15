const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {logger} = require('../winstonLogger')

const auth = async (req, res, next) => {
    try { //break code to repository and service!!!!!
        const token = req.body.token
        const decoded = jwt.verify(token, process.env.BCRYPT_HASH)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            logger.log ({
                level:"error",
                message:`failed to find user to authenticate`
            })
            throw new Error(`failed to find user to authenticate`)
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication failure' })
    }
}

module.exports = auth