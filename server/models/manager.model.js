const mongoose = require('mongoose')
const Schema = mongoose.Schema

const managerSchema = new Schema({
  name: String,
  email: String
}, {collection: 'managers'})

module.exports = mongoose.model('managers', managerSchema)