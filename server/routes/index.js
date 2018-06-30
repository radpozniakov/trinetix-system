const express = require('express');
const router = express.Router();
const Manager = require('../models/manager.model')

/* GET home page. */
router.get('/t', (req, res, next) => {
  res.send({manager: req.session.manager, xAuth: req.session.xAuth })
})

// router.post('/test', (req, res, next) => {
//   console.log(req.headers['x-auth'])
//   res.send(req)
// })

module.exports = router;
