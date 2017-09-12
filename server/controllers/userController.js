require('dotenv').config()
const FB = require('fb')
const jwt = require('jsonwebtoken')
const hash = require('object-hash')
const User = require('../models/User')

module.exports = {
  getUser: (req, res) => {
    FB.api('/me', response => {
      console.log(response)
    })
  },

  login: (req, res) => {
    User.findOne({
      facebookId: req.headers.fbid
    })
    .then(user => {
      if (user == null) {
        FB.setAccessToken(req.headers.fbaccesstoken)
        FB.api('/me', response => {
          User.create({
            facebookId: response.id,
            name: response.name
          })
          .then(createdUser => {
            res.send(jwt.sign({
              _id: createdUser._id,
              name: createdUser.name
            }, process.env.APP_SECRET_KEY))
          })
          .catch(err => res.send(err))
        })
      } else
        res.send(jwt.sign({
          _id: user._id,
          name: user.name
        }, process.env.APP_SECRET_KEY))
    })
    .catch(err => res.send(err))
  },

  me: (req, res) => {
    User.findOne({
      _id: req.headers.userVerified._id
    }, '_id name')
    .then(user => res.send(user))
    .catch(err => res.send(err))
  }
}
