const Shift = require('../models/Shift')
const { shifsOverlapQuery, generateErrorResponse } = require('../utils')
const { requestBodyInvalid, shiftOvelapsError } = require('../../i18n')

const createShift = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)
  const { businessName } = req.user
  const { startTime, endTime, userId } = req.body
  if (!startTime || !endTime || !userId) return generateErrorResponse(res, 400, requestBodyInvalid)

  const conditionCheck = shifsOverlapQuery(startTime, endTime, userId)

  Shift.find(conditionCheck).countDocuments((err, count) => {
    if (err) return gerenateErrorResponse(res, 400, err.message)
    //If any count exists, return error
    if (count) {
      return generateErrorResponse(res, 400, shiftOvelapsError)
    } else {
      const shift = new Shift({ ...req.body, businessName })

      shift
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            shift: shift,
          })
        })
        .catch((error) => {
          return generateErrorResponse(res, 400, error.message)
        })
    }
  })
}

const getAllShifts = (req, res) => {
  const { start, end, userId } = req.query
  const conditions = [{ businessName: req.user.businessName }]
  if (req.user.role === 'employee') {
    conditions.push({ userId: req.user._id })
  } else if (req.user.role === 'administrator' && userId) {
    conditions.push({ userId: userId })
  }
  if (start) conditions.push({ startTime: { $gte: parseInt(start) } })
  if (end) conditions.push({ startTime: { $lte: parseInt(end) } })

  Shift.find({ $and: conditions })
    .sort({ startTime: 1 })
    .exec((error, shifts) => {
      if (error) return generateErrorResponse(res, 400, error.message)

      return res.status(200).json({
        success: true,
        shifts,
      })
    })
}

const updateShift = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)

  const { startTime, endTime } = req.body
  const conditionCheck = shifsOverlapQuery(startTime, endTime)

  Shift.find(conditionCheck).countDocuments((err, count) => {
    if (err) return gerenateErrorResponse(res, 400, err.message)
    //If count exists, then shift overlaps
    if (count) {
      return generateErrorResponse(res, 400, shiftOvelapsError)
    } else {
      Shift.updateOne({ _id: req.params.id }, req.body, (error, shift) => {
        if (error) generateErrorResponse(res, 400, error.message)

        return res.status(200).json({
          success: true,
          _id: shift._id,
        })
      })
    }
  })
}

const getShiftById = (req, res) => {
  Shift.findById({ _id: req.params.id }, (error, shift) => {
    if (error) generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      success: true,
      shift,
    })
  })
}

const deleteShift = (req, res) => {
  if (req.user.role !== 'administrator') return generateErrorResponse(res, 403, userUnathorized)
  Shift.findOneAndDelete({ _id: req.params.id }, (error, shift) => {
    if (error) generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      suceess: true,
      id: shift.id,
    })
  })
}

module.exports = {
  createShift,
  getAllShifts,
  updateShift,
  getShiftById,
  deleteShift,
}
