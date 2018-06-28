const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clusterSchema = new Schema({
  year: String,
  month: String,
  value: String,
  managerId: {
    id: String,
    name: String,
  },
  user: {
    id: String,
    name: String,
  },
  type: {
    id: String,
    title: String
  }
}, {collection: 'cluster'})

module.exports = mongoose.model('cluster', clusterSchema)