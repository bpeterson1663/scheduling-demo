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
module.exports = {
    shifsOverlapQuery,
}