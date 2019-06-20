const express = require('express')
const helmet = require('helmet')
const users = require('../users/usersRouter.js')
const authRouter = require('../auth/auth-router')

const server = express()

server.use(express.json())
server.use(helmet())

server.use('/api/auth', authRouter)
server.use('/api/users', users)

server.get('/', (req, res) => {
    res.send('Welcome to the best server!')
})

module.exports = server;