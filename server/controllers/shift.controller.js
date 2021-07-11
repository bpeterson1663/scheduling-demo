const Shift = require('../models/Shift')
const { shifsOverlapQuery, generateErrorResponse } = require('../utils')
const { requestBodyInvalid, shiftOvelapsError } = require('../../i18n')

const createShift = (req, res) => {
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)

  const { startTime, endTime } = req.body
  const conditionCheck = shifsOverlapQuery(startTime, endTime)

  Shift.find(conditionCheck).count((err, count) => {
    if (err) return gerenateErrorResponse(res, 400, err.message)
    //If any count exists, return error
    if (count) {
      return generateErrorResponse(res, 400, shiftOvelapsError)
    } else {
      const shift = new Shift(req.body)

      shift
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: shift._id,
          })
        })
        .catch((error) => {
          return generateErrorResponse(res, 400, error.message)
        })
    }
  })
}

const getAllShifts = (req, res) => {
  const { start, end } = req.query
  const conditions = []

  if (start) conditions.push({ startTime: { $lte: parseInt(start) } })
  if (end) conditions.push({ endTime: { $gte: parseInt(end) } })

  const searchCondition = conditions.length > 0 ? { $and: conditions } : {}

  Shift.find(searchCondition, (error, shifts) => {
    if (error) return generateErrorResponse(res, 400, error.message)

    return res.status(200).json({
      success: true,
      shifts,
    })
  })
}

const updateShift = (req, res) => {
  if (!req.body) return generateErrorResponse(res, 400, requestBodyInvalid)

  const { startTime, endTime } = req.body
  const conditionCheck = shifsOverlapQuery(startTime, endTime)

  Shift.find(conditionCheck).count((err, count) => {
    //If count exists, then shift overlaps
    if (count) {
      return generateErrorResponse(res, 400, shiftOvelapsError)
    } else {
      Shift.updateOne({ _id: req.params.id }, req.body, (error, shift) => {
        if (error) generateErrorResponse(res, 400, error.message)

        return res.status(200).json({
          success: true,
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
