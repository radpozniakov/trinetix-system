const express = require('express')
const router = express.Router()
const {Manager} = require('../../models/manager.model')
const userctl = require('../../contollers/userController')
const {authenticate} = require('../../policies/isAuthenticate')
const _ = require('lodash')

//router.get('/', userctl.index)
router.post('/add', userctl.registration)


module.exports = router;