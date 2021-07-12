const express = require('express')
const router = express.Router()
const ShiftController = require('../controllers/shift.controller')
const authorized = require('../middleware/middleware')

router.post('/shift', authorized, ShiftController.createShift)
router.get('/shifts', authorized, ShiftController.getAllShifts)
router.get('/shift/:id', authorized, ShiftController.getShiftById)
router.put('/shift/:id', authorized, ShiftController.updateShift)
router.delete('/shift/:id', authorized, ShiftController.deleteShift)

module.exports = router
