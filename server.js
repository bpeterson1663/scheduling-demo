const express = require('express')
const app = express()
const db = require('./db')
const PORT = 4000

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))