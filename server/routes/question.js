const router = require('express').Router()
const jwt = require('jsonwebtoken')
const controller = require('../controllers/questionController')

const userVerify = (req, res, next) => {
  req.headers.userVerified = jwt.verify(req.headers.accesstoken, process.env.APP_SECRET_KEY)
  next()
}

router.get('/', controller.getAll)
router.get('/mine', controller.getByUser)
router.get('/:id', controller.getById)
router.post('/', userVerify, controller.create)
router.put('/:id', userVerify, controller.update)
router.delete('/:id', userVerify, controller.delete)
//voutes question
router.post('/:id/vote', userVerify, controller.voteQuestion)

//answers
router.post('/:id/answer', userVerify, controller.createAnswer)
router.patch('/:id/answer/:answerId', userVerify, controller.updateAnswer)
router.delete('/:id/answer/:answerId', userVerify, controller.deleteAnswer)

//voutes answer
router.post('/:id/answer/:answerId/vote', userVerify, controller.voteAnswer)

module.exports = router
