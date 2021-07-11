const { userUnathorized } = require('../../i18n')
const { generateErrorResponse } = require('../utils')

const withAuth = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    return generateErrorResponse(res, 403, userUnathorized)
  }
}

module.exports = withAuth
