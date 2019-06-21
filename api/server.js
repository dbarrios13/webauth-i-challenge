const express = require('express')
const helmet = require('helmet')
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const users = require('../users/usersRouter.js')
const authRouter = require('../auth/auth-router')

const server = express()

const sessionConfig = {
    name: 'monkey', // by default it would be sid - change name for security
    secret: 'keep it secret, keep it safe!',
    resave: false, // save bandwidth
    saveUninitialized: true, // GDPR compliance
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false, // in production always sent it as true
        httpOnly: true, // always true, JS can't access the cookie
    },
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60 // when you want to get rid of all sessions
    })
}

server.use(express.json())
server.use(helmet())
server.use(session(sessionConfig))

server.use('/api/auth', authRouter)
server.use('/api/users', users)

server.get('/', (req, res) => {
    res.send('Welcome to the best server!')
})

module.exports = server;