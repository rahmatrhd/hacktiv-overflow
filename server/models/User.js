const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  facebookId: {
    type: String,
    default: null
  },
  username: {
    type: String,
    default: null,
    unique: true
  }
})

module.exports = mongoose.model('User', schema)
