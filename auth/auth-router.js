const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel')

const router = express.Router();

router.post('/register', (req, res) => {
    let user = req.body

    const hash = bcrypt.hashSync(user.password, 8)

    user.password = hash

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    message: `Welcome ${user.username}`
                })
            } else {
                res.status(401).json({
                    message: 'Invalid Credentials'
                })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router