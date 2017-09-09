const Question = require('../models/Question')

module.exports = {
  getAll: (req, res) => {
    Question.find()
    .populate([{
      path: 'user',
      select: 'name',
    }, {
      path: 'answers.user',
      select: 'name',
    }, {
      path: 'votes.user',
      select: 'name'
    }, {
      path: 'answers.votes.user',
      select: 'name'
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

  getById: (req, res) => {
    Question.findOne({
      _id: req.params.id
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
    Question.findOneAndUpdate({
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
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  //answers
  createAnswer: (req, res) => {
    Question.updateOne({
      _id: req.params.id
    }, {
      $push: {
        answers: {
          body: req.body.body,
          user: req.headers.userVerified._id
        }
      }
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  updateAnswer: (req, res) => {
    Question.updateOne({
      _id: req.params.id,
      'answers._id': req.params.answerId
    }, {
      $set: {
        'answers.$.body': req.body.body
      }
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  deleteAnswer: (req, res) => {
    Question.updateOne({
      _id: req.params.id
    }, {
      $pull: {
        answers: {
          _id: req.params.answerId
        }
      }
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },

  //votes
  voteQuestion: (req, res) => {
    Question.findOne({
      _id: req.params.id,
      'votes.user': req.headers.userVerified._id
    })
    .then(data => {
      if (data == null)
        Question.updateOne({
          _id: req.params.id
        }, {
          $push: {
            votes: {
              value: req.body.value,
              user: req.headers.userVerified._id
            }
          }
        })
        .then(data => res.send(data))
        .catch(err => res.send(err))
      else
        Question.updateOne({
          _id: req.params.id
        }, {
          $pull: {
            votes: {
              user: req.headers.userVerified._id
            }
          }
        })
        .then(data => res.send(data))
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  },

  voteAnswer: (req, res) => {
    Question.findOne({
      _id: req.params.id,
      'answers._id': req.params.answerId,
      'answers.votes.user': req.headers.userVerified._id
        // $elemMatch: {_id: req.params.answerId}
      // ,
      // 'answers.votes': {
      //   $elemMatch: {_id: req.headers.userVerified._id}
      // }
      // $and: [
      //   {_id: {$elemMatch: req.params.id},
      //   {'answers._id': req.params.answerId},
      //   {'answers.votes.user': req.headers.userVerified._id}
      // ]
    })
    .then(data => {
      console.log(data)

      // Question.find({
      //   _id: req.params.id,
      //   'answers._id': req.params.answerId
      // })
      // .then(data => console.log(data))
      // .catch(err => console.log(data))
      // console.log(req.params.answerId);

      if (data == null)
        Question.updateOne({
          _id: req.params.id,
          'answers._id': req.params.answerId
        }, {
          $push: {
            'answers.$.votes': {
              value: req.body.value,
              user: req.headers.userVerified._id
            }
          }
        }, {
          upsert: true
        })
        .then(data => res.send(data))
        .catch(err => res.send(err))
      else
        Question.updateOne({
          _id: req.params.id,
          'answers._id': req.params.answerId
        }, {
          $pull: {
            'answers.$.votes': {
              user: req.headers.userVerified._id
            }
          }
        })
        .then(data => res.send(data))
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  }
}
