const express = require('express')
const UserCtrl = require('../controllers/user.controller')
const router = express.Router()

router.post('/user', UserCtrl.createUser)
router.post('/login', UserCtrl.authenticateUser)
router.delete('/logout', UserCtrl.logoutUser)
router.get('/authorized', UserCtrl.checkAuth)

module.exports = router
