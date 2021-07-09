const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const CONNECTION_STRING = process.env.CONNECTION_STRING

mongoose
    .connect(CONNECTION_STRING, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

module.exports = db