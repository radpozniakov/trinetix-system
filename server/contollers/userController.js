const {Manager} = require('../models/manager.model')
const _ = require('lodash')

module.exports = {
  allManagers: async (req, res, next) => {
    try{
      console.log(req.session)
      let managers = await Manager.find({})
      res.send(managers)
    }catch(err){
      next(err)
    }
  },
  singleManager: async (req, res, next) => {
    try{
      let manager = await Manager.findOne({_id: req.params.id})
      res.send(manager)
    }catch(err){
      next(err)
    }
  },
  registration: async (req, res, next) => {
      try{
        let body = _.pick(req.body, ['email', 'password'])
        let manager = new Manager(body)
        let result = await manager.save()
        manager.generateAuthToken()
        res.send(result)
      } catch (err){
        next(err)
      }
  },
  login: async (req, res, next) => { 
    try{
      let body = _.pick(req.body, ['email', 'password'])
      let manager = await Manager.findByCredentials(body.email, body.password)
      let token = await manager.generateAuthToken()
      req.session.authorized = true;
      req.session.manager = manager;
      req.session.xAuth = token;
      res.send({
        session: req.session,
        token: token
      })
    }catch (err){
      next(err)
    }
  },
  logOut: async(req, res, next) => {
    try{
      let result = await Manager.removeToken(req.body.token)
      res.send(result)
      req.session.destroy()
    }catch(err){
      next(err)
    }
  },
  isAuthenticate: async (req, res, next) => {
    try{
      let token = req.headers['x-auth']
      let authenticationStatus = await Manager.findByToken(token)
      req.manager = authenticationStatus;
      req.token = token;
      next();
    }catch (error){
      res.send('Ошибка аификации')
    }
  }
}