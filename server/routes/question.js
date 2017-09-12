const router = require('express').Router()
const jwt = require('jsonwebtoken')
const controller = require('../controllers/questionController')

const userVerify = (req, res, next) => {
  if (req.headers.token != null) {
    req.headers.userVerified = jwt.verify(req.headers.token, process.env.APP_SECRET_KEY)
    next()
  } else {
    res.send('not logged in')
  }
}

router.get('/', controller.getAll)
router.get('/mine', userVerify, controller.getByUser)
router.get('/:id', controller.getById)
router.post('/', userVerify, controller.create)
router.put('/:id', userVerify, controller.update)
router.delete('/:id', userVerify, controller.delete)
// view increment
router.patch('/:id/view', userVerify, controller.view)
// votes
router.patch('/:id/upvote', userVerify, controller.upvoteQuestion)
router.patch('/:id/downvote', userVerify, controller.downvoteQuestion)

module.exports = router
