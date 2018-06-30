const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const session = require('express-session')
const passport = require('passport')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fullstack')

const indexRouter = require('./routes/index')
const managerRouter = require('./routes/managers/index')


const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//Handle sessions
app.use(session({
  secret: 'grdbrbftnftnbfd',
  saveUninitialized: false,
  resave: false
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/managers', managerRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

module.exports = app
