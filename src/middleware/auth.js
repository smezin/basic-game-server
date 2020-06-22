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
            throw new ErrorHandler(401, `Authentication failure`)
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        next(error)
    }
}
module.exports = auth