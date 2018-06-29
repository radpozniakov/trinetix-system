const express = require('express');
const router = express.Router();
const Manager = require('../models/manager.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/test', (req, res, next) => {
  let body = {
    name: req.body.name,
    email: req.body.email
  }
  let managerSchema = new Manager(body)

  managerSchema.save().then((x) => {
    res.send(x)
  }).catch((error) =>{
    res.send(error)
  })

})

module.exports = router;
