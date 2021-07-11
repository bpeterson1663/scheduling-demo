const express = require('express')
const UserCtrl = require('../controllers/user.controller')
const router = express.Router()
const authorized = require('../middleware/middleware')

router.post('/register', UserCtrl.registerAndSignIn)
router.post('/login', UserCtrl.authenticateUser)
router.delete('/logout', UserCtrl.logoutUser)
router.get('/authorized', UserCtrl.checkAuth)

router.post('/user', authorized, UserCtrl.createUser)
router.get('/users', authorized, UserCtrl.getAllUsers)
router.get('/user/:id', authorized, UserCtrl.getUserById)
router.delete('/user/:id', authorized, UserCtrl.deleteUser)
router.put('/user/:id', authorized, UserCtrl.updateUser)

module.exports = router
