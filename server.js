const express = require('express')
const path = require('path')
const app = express()
const db = require('./db')
const ShiftRouter = require('./routers/shift.router')

const PORT = process.env.PORT || 4000

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())
app.use('/api', ShiftRouter)
app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
