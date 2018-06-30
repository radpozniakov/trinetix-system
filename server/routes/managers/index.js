const express = require('express')
const router = express.Router()
const {Manager} = require('../../models/manager.model')
const userctl = require('../../contollers/userController')
const {authenticate} = require('../../policies/isAuthenticate')
const _ = require('lodash')



router.get('/', userctl.isAuthenticate, userctl.allManagers)

router.get('/:id', userctl.isAuthenticate, userctl.singleManager)

router.post('/add', userctl.registration)

router.post('/login', userctl.login)

router.post('/logout', userctl.isAuthenticate, userctl.logOut)


module.exports = router;