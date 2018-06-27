const express = require('express')
const router = express.Router()
const police = require('../policies/testPolicie')
/* GET home page. */
router.post('/test', police, function(req, res, next) {
  res.send(req.body)
})

module.exports = router;
