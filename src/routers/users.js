const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const userRepo = require('../models/userRepo')
const auth = require('../middleware/auth')
const {ErrorHandler} = require('../middleware/errorHandler')
const {logger} = require('../winstonLogger')

const router = new express.Router()

router.post('/users', async (req, res, next) => {
    const user = new User(req.body)
    try { 
        await userRepo.saveUser(user)
        const token = await user.generateAuthToken()
        if (!user || !token) {
            throw new ErrorHandler(500, 'failure at creating new user')
        }
        res.status(201).send({user, token})
    } catch (error) {
        next(error)
    }
})

router.get('/users/', async (req, res, next) => {
    try {
        const users = await userRepo.getAllUsers()
        res.send(users)
        if (!users) {
            throw new ErrorHandler(500, 'could not fetch users')
        }
    } catch(error) {
        next(error)
    }
})

router.patch('/users/me', auth, async (req, res, next) => {
    try {
        const user = req.user
        user.wins = req.body.wins
        user.loses = req.body.loses
        await userRepo.saveUser(user)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

router.post('/users/login', async (req, res, next) => { 
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password)
        const token = await user.generateAuthToken()  
        if (!user || !token) {
            throw new ErrorHandler(500, 'user/token error on login')
        }
        logger.log({
            level: 'info',
            message: `${user.userName} logged in`
        })  
        res.send({ user, token })
    } catch (error) {
        next(error)
    }
})

router.post('/users/logout', auth, async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await userRepo.saveUser(req.user)
        logger.log({
            level: 'info',
            message: `${req.user.userName} logged out`
        })  
        res.status(200).send({'user':'out'})
    } catch (error) {
        next(error)
    }
})

module.exports = router
