const router = require('express').Router()
const jwt = require('jsonwebtoken')
const controller = require('../controllers/answerController')

const userVerify = (req, res, next) => {
  if (req.headers.token != null) {
    req.headers.userVerified = jwt.verify(req.headers.token, process.env.APP_SECRET_KEY)
    next()
  } else {
    res.send('not logged in')
  }
}

router.post('/q/:id', userVerify, controller.create)
router.delete('/:id', userVerify, controller.delete)

router.patch('/:id/upvote', userVerify, controller.upvoteAnswer)
router.patch('/:id/downvote', userVerify, controller.downvoteAnswer)

module.exports = router
