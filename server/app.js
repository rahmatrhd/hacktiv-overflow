const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/hacktivOverflow')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const index = require('./routes/index')
const user = require('./routes/user')
const question = require('./routes/question')
const answer = require('./routes/answer')

app.use('/', index)
app.use('/user', user)
app.use('/question', question)
app.use('/answer', answer)

app.listen(process.env.PORT || 3000, () => {
  console.log('adsasdad')
})
