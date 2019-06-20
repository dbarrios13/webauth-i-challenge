const express = require('express')
const restricted = require('../auth/restricted')

const Users = require('./usersModel')

const router = express.Router();

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router