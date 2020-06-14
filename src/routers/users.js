const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {logger} = require('../middleware/winstonLogger')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try { //loose all try/catch and convert to global error handler
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    try {
        const user = req.user
        user.wins = req.body.wins
        user.loses = req.body.loses
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => { 
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password)
        const token = await user.generateAuthToken()   
        logger.log({
            level: 'info',
            message: `${user.userName} logged in`
        })  
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        logger.log({
            level: 'info',
            message: `${req.user.userName} logged out`
        })  
        res.status(200).send({'user':'out'})
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router
