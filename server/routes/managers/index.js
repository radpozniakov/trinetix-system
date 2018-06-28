const express = require('express');
const router = express.Router();
const qqqq = require('../../models/invoice.model');
const _ = require('lodash');


router.post('/add', function(req, res){
  var body = _.pick(req.body, ['year', 'month']);
  var ww = new qqqq(body);

  ww.save().then((e) => {
    res.send('svvs')
  }).cath((e) => {
    res.send(e)
  })

});

router.get('/', (req, res) => {
  res.send('ok')
});

module.exports = router