const User = require('../models/User')
const passport = require('passport')
const { generateErrorResponse } = require('../utils')
const {
  loggedIn,
  loggedOut,
  userUnathorized,
  emailAlreadyExists,
  businessAlreadyExists,
  genericSignUpError,
} = require('../../i18n')

const registerAndSignIn = (req, res) => {
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)
  const user = new User(req.body)
  const { businessName } = req.body
  User.find({ businessName: businessName }).countDocuments((err, count) => {
    if (err) return gerenateErrorResponse(res, 400, err.message)
    // If at least one user has businessName with the new users buinsess name then dont let them sign up
    if (count) {
      return generateErrorResponse(res, 400, businessAlreadyExists)
    } else {
      user
        .save()
        .then(() => {
          req.logIn(user, (err) => {
            if (err) generateErrorResponse(res, 401, err)
            const { email, _id, firstName, lastName, businessName, role } = user
            return res
              .status(201)
              .json({ user: { _id, email, firstName, lastName, businessName, role }, success: true, message: loggedIn })
          })
        })
        .catch((error) => {
          let errorMessage = genericSignUpError
          if (error && error.keyPattern && error.keyPattern.email === 1) errorMessage = emailAlreadyExists
          return generateErrorResponse(res, 400, errorMessage)
        })
    }
  })
}

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return generateErrorResponse(res, 401, err)
    else {
      req.logIn(user, (err) => {
        if (err) return generateErrorResponse(res, 401, err)
        const { email, _id, firstName, lastName, businessName, role } = user
        res
          .status(201)
          .json({ user: { _id, email, firstName, lastName, businessName, role }, success: true, message: loggedIn })
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
      error: null,
    })
  }
}

const createUser = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)

  const { businessName } = req.user
  const user = new User({ ...req.body, businessName })

  user
    .save()
    .then(() => {
      const { _id, email, firstName, lastName, businessName, role } = user
      return res.status(201).json({
        success: true,
        id: user._id,
        user: { _id, email, firstName, lastName, businessName, role },
      })
    })
    .catch((error) => {
      return generateErrorResponse(res, 400, error.message)
    })
}

const getAllUsers = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)

  User.find({ businessName: req.user.businessName, _id: { $ne: req.user._id } }, (error, users) => {
    if (error) return generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      success: true,
      users,
    })
  })
}

const deleteUser = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)
  User.findOneAndDelete({ _id: req.params.id }, (error, user) => {
    if (error) generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      suceess: true,
      id: user.id,
    })
  })
}

const updateUser = (req, res) => {
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)

  User.updateOne({ _id: req.params.id }, req.body, (error, user) => {
    if (error) generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      success: true,
      _id: user._id,
    })
  })
}

const getUserById = (req, res) => {
  if (req.user.role === 'employee' && req.params.id !== req.user._id)
    return generateErrorResponse(res, 403, userUnathorized)

  User.findById({ _id: req.params.id }, (error, user) => {
    if (error) generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      success: true,
      user,
    })
  })
}

module.exports = {
  registerAndSignIn,
  authenticateUser,
  logoutUser,
  checkAuth,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
}
