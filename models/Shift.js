const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Shift = new Schema({
    name: { type: String, required: true, immutable: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
})

module.exports = mongoose.model('shift', Shift)