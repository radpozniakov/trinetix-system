const { Manager } = require('../models/manager.model');

let authenticate = (req, res, next) => {
  let token = req.session.xAuth;

  Manager.findByToken(token).then((manager) => {
    if (!manager) {
      return Promise.reject();
    }
    req.manager = manager;
    req.token = token;
    next();
  }).catch((e) => {
    res.redirect('/login')
  });
};

module.exports = { authenticate };