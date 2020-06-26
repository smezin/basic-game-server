const User = require('./user')
const jwt = require('jsonwebtoken')

const getUserForAuth = async (decodedHash, token) => {
    const user = await User.findOne({ _id: decodedHash._id, 'tokens.token': token })
    return user
}
const getAllUsers = async () => {
    users = await User.find({})
    return users
}
const saveUser = async (user) => {
    await user.save()
}

module.exports = {
    getUserForAuth,
    getAllUsers,
    saveUser,
}