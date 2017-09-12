const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
  getAll: (req, res) => {
    Question.find()
    .populate('user', '_id name')
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  getById: (req, res) => {
    Question.findOne({
      _id: req.params.id
    })
    .populate([{
      path: 'user',
      select: 'name'
    }, {
      path: 'answers',
      select: 'body user createdAt upVotes downVotes',
      populate: {
        path: 'user',
        select: 'name'
      }
    }])
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  getByUser: (req, res) => {
    Question.find({
      user: req.headers.userVerified._id
    })
    .populate('user', '_id name')
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  create: (req, res) => {
    Question.create({
      title: req.body.title,
      body: req.body.body,
      user: req.headers.userVerified._id
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  update: (req, res) => {
    Question.updateOne({
      _id: req.params.id,
      user: req.headers.userVerified._id
    }, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: new Date()
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  delete: (req, res) => {
    Question.deleteOne({
      _id: req.params.id,
      user: req.headers.userVerified._id
    })
    .then(data => res.send(data)) // fail: {ok: 1, n:0}
    .catch(err => res.send(err))
  },

  view: (req, res) => {
    Question.updateOne({
      _id: req.params.id,
      user: {
        $ne: req.headers.userVerified._id
      },
      views: {
        $ne: req.headers.userVerified._id
      }
    }, {
      $push: {
        views: req.headers.userVerified._id
      }
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  upvoteQuestion: (req, res) => {
    Question.findOne({
      _id: req.params.id,
      upVotes: req.headers.userVerified._id
    })
    .then(data => {
      let action = data ? '$pull' : '$push'
      Question.updateOne({
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

  downvoteQuestion: (req, res) => {
    Question.findOne({
      _id: req.params.id,
      downVotes: req.headers.userVerified._id
    })
    .then(data => {
      let action = data ? '$pull' : '$push'
      Question.updateOne({
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
