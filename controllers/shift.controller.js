const Shift = require('../models/Shift')

const createShift = (req, res) => {
    if(!req.body) {
        return res.status(400).json({
            success: false,
            error: 'Request body is invalid for shift'
        })
    }
    const shift = new Shift(req.body)
    //Check if shift overlaps with existing shift
    Shift.find({
      $or: [
        { 
          $and: [
            { startTime: { $lte: req.body.startTime } },
            { endTime: { $gte: req.body.startTime } }
          ]
        },
        { 
          $and: [
            { startTime: { $gte: req.body.endTime } },
            { endTime: { $lte: req.body.endTime } }
          ]
        }
      ]
    }).count((err, count) => {
        //If any count exists, return error
        if( count ){
            return res.status(400).json({
                success: false,
                error: 'Shift overlaps with an already existing shift'
            })
        }else {
            shift
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: shift._id
                })
            })
            .catch(error => {
                return res.status(400).json({
                    success: false,
                    error
                })
            })
        }
    })
}

const getAllShifts = (req, res) => {
    Shift.find({}, (error, shifts) => {
        if(error) {
            return res.status(400).json({
                success: false,
                error,
            })
        }
        return res.status(200).json({
            success: true,
            shifts
        })
    })
}

const updateShift = (req, res) => {
    if(!req.body) {
        return res.status(400).json({
            success: falase,
            error: 'Request body is invalid for shift'
        })
    }
    Shift.updateOne({ _id: req.params.id}, req.body, (error, shift) => {
        if(error) {
            return res.status(400).json({
                success: false,
                error
            })
        }
        return res.status(200).json({
            success: true
        })
    })
}

const getShiftById = (req, res) => {
    Shift.findById({ _id: req.params.id }, (error, shift) => {
        if(error) {
            return res.status(400).json({
                success: false,
                error
            })
        }
        return res.status(200).json({
            success: true,
            shift
        })
    })
}

const deleteShift = (req, res) => {
    Shift.findOneAndDelete({ _id: req.params.id }, (error, shift) => {
        if (error) {
          return res.status(400).json({ 
              success: false,
              error
            })
        }
        return res.status(200).json({ 
            suceess: true
        })
    })
}

module.exports = {
    createShift,
    getAllShifts,
    updateShift,
    getShiftById,
    deleteShift
}