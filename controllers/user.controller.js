const User = require('../models/User')
const passport = require('passport')
const { generateErrorResponse } = require('../utils')
const { loggedIn, loggedOut } = require('../i18n')

const createUser = (req, res) => {
  const user = new User(req.body)

  user
    .save()
    .then(() => {
      req.logIn(user, (err) => {
        if (err) generateErrorResponse(res, 401, err)
        return res.status(201).json({ userId: user._id, success: true, message: loggedIn })
      })
    })
    .catch((error) => {
      return generateErrorResponse(res, 400, error)
    })
}

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return generateErrorResponse(res, 401, err)
    else {
      req.logIn(user, (err) => {
        if (err) return generateErrorResponse(res, 401, err)
        res.status(201).json({ userId: user.id, success: true, message: loggedIn })
      })
    }
  })(req, res, next)
}

const logoutUser = (req, res) => {
  req.logout()
  res.status(201).json({ success: true, message: loggedOut })
}

const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.user,
    })
  } else {
    return res.status(403).json({
      success: false,
      error: 'Unathorized',
    })
  }
}
module.exports = {
  createUser,
  authenticateUser,
  logoutUser,
  checkAuth,
}
