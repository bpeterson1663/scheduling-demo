const express = require('express')
const app = express()
const db = require('./db')
const ShiftRouter = require('./routers/shift.router')

const PORT = process.env.PORT || 4000

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())
app.use('/api', ShiftRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))