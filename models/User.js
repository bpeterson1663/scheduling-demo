const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  businessName: { type: String, required: true },
})

User.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const _this = this
    bcrypt.hash(_this.password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) {
        next(err)
      } else {
        _this.password = hashedPassword
        next()
      }
    })
  } else {
    next()
  }
})

User.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err)
    } else {
      callback(err, same)
    }
  })
}

module.exports = mongoose.model('users', User)
