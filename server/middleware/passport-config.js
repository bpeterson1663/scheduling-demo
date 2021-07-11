const User = require('../models/User')
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy
const { emailOrPasswordIncorrect } = require('../../i18n')

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) return done(err, false)
        if (!user) return done(emailOrPasswordIncorrect, false)
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err
          if (result === true) {
            return done(null, user)
          } else {
            return done(emailOrPasswordIncorrect, false)
          }
        })
      })
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findById(_id, (err, user) => {
      if (err) {
        done(null, false, { error: err })
      } else {
        const { _id, email, role, firstName, lastName, businessName } = user
        const userInformation = {
          _id: String(_id),
          email,
          role,
          firstName,
          lastName,
          businessName,
        }
        done(null, userInformation)
      }
    })
  })
}
