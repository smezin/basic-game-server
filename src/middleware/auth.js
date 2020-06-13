const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    console.log(req.body.token)
    try {
        const token = req.body.token
        const decoded = jwt.verify(token, 'myarbitrarystring')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            console.log('failed to find user')
            throw new Error()
        }
        req.user = user
        req.token = token
        console.log('authenticated')
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication failure' })
    }
}

module.exports = auth