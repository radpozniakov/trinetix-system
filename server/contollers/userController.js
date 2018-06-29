const {Manager} = require('../models/manager.model')
const _ = require('lodash')

module.exports = {
  async registration(req, res){
      const body = _.pick(req.body, ['email', 'password'])
      const manager = new Manager(body)
      var promise = await manager.save().exec()
      res.send(promise)
  },
  async isAuthenticate(req, res, next){
    try{
      let token = req.session.xAuth;
      let authenticationStatus = await Manager.findByToken(token)
      req.manager = authenticationStatus;
      req.token = token;
      next();
    }catch (error){
      res.send('Ошибка аификации')
    }
  }
}