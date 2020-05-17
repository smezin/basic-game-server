const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//create new user
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
//get users list 
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})
//change rating
router.patch('/users/me', auth, async (req, res) => {
    try {
        const user = req.user;
        user.rating = req.body.rating;
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.userName, req.body.password);
        const token = await user.generateAuthToken();        
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});
module.exports = router
