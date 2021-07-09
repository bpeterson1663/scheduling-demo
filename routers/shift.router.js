const express = require('express')
const router = express.Router()
const ShiftController = require('../controllers/shift.controller')

router.post('/shift', ShiftController.createShift)
router.get('/shifts', ShiftController.getAllShifts)
router.get('/shift/:id', ShiftController.getShiftById)
router.put('/shift/:id', ShiftController.updateShift)
router.delete('/shift/:id', ShiftController.deleteShift)

module.exports = router