const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {
    console.log('req.body: ', req.body)
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users',async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router
