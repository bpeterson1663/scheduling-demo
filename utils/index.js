const shifsOverlapQuery = (startTime, endTime) => (
    {
        $or: [
          { 
            $and: [
              { startTime: { $lte: startTime } },
              { endTime: { $gte: startTime } }
            ]
          },
          { 
            $and: [
              { startTime: { $gte: endTime } },
              { endTime: { $lte: endTime } }
            ]
          }
        ]
      }
)

const generateErrorResponse = (res, status, errorMessage) => (
  res.status(status).json({
      success: false,
      error: errorMessage
  })
)

module.exports = {
    shifsOverlapQuery,
    generateErrorResponse
}