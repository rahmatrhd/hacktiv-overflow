const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
  create: (req, res) => {
    Answer.create({
      body: req.body.body,
      user: req.headers.userVerified._id
    })
    .then(dataAnswer => {
      Question.updateOne({
        _id: req.params.id
      }, {
        $push: {
          answers: dataAnswer._id
        }
      })
      .then(data => res.send(dataAnswer))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  },

  delete: (req, res) => {
    Answer.deleteOne({
      _id: req.params.id
    })
    .then(data => {
      if (data.result.n >= 1)
        Question.updateOne({
          answers: req.params.id
        }, {
          $pull: {
            answers: req.params.id
          }
        })
        .then(data => res.send(data))
        .catch(err => res.send(err))
      else
        res.send(data)
    })
    .catch(err => res.send(err))

  },

  upvoteAnswer: (req, res) => {
    Answer.findOne({
      _id: req.params.id,
      upVotes: req.headers.userVerified._id
    })
    .then(data => {
      let action = data ? '$pull' : '$push'
      Answer.updateOne({
        _id: req.params.id
      }, {
        [action]: {
          upVotes: req.headers.userVerified._id
        }
      })
      .then(data => res.send(data))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  },

  downvoteAnswer: (req, res) => {
    Answer.findOne({
      _id: req.params.id,
      downVotes: req.headers.userVerified._id
    })
    .then(data => {
      let action = data ? '$pull' : '$push'
      Answer.updateOne({
        _id: req.params.id
      }, {
        [action]: {
          downVotes: req.headers.userVerified._id
        }
      })
      .then(data => res.send(data))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  }
}
