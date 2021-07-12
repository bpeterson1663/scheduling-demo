const shifsOverlapQuery = (startTime, endTime, userId) => ({
  userId: userId,
  $or: [
    {
      $and: [{ startTime: { $lte: startTime } }, { endTime: { $gt: startTime } }],
    },
    {
      $and: [{ startTime: { $gt: endTime } }, { endTime: { $lte: endTime } }],
    },
  ],
})

const generateErrorResponse = (res, status, errorMessage) =>
  res.status(status).json({
    success: false,
    error: errorMessage,
  })

module.exports = {
  shifsOverlapQuery,
  generateErrorResponse,
}
