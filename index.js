const express = require('express')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const app = express()
const db = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ShiftRouter = require('./server/routers/shift.router')
const UserRouter = require('./server/routers/user.router')
const passportConfig = require('./server/middleware/passport-config')

const SECRET = process.env.SECRET
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://when-i-work-challenge.herokuapp.com'], // <-- location of the react app for development
    credentials: true,
  }),
)
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  }),
)
app.use(cookieParser(SECRET))
app.use(passport.initialize())
app.use(passport.session())

passportConfig(passport)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', ShiftRouter)
app.use('/api', UserRouter)
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
