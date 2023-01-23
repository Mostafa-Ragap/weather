const asyncHandler = require("express-async-handler");

const Track = require("../models/trackModel");
const Device = require("../models/deviceModel");

const createTrack = asyncHandler(async (req, res) => {
  const { deviceSerial, tempereture, humidity } = req.body;
  const time = Date.now();

  const checkDevice = await Device.findOne({ serialNumber: deviceSerial });
  if (!checkDevice)
    return res.status(404).json({ message: "this divece is not found " });

  const track = await Track.create({
    deviceSerial,
    tempereture,
    humidity,
    time,
    location: { type: "Point", coordinates: checkDevice.location.coordinates },
  });
  res.status(200).json(track);
});

const getAlltracks = asyncHandler(async (req, res) => {
  const { startDate, endDate, interval, latlong } = req.body;

  const track = await Track.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: latlong },
        distanceField: "distance",
        query: { time: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        maxDistance: 500,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: `${interval}`, date: "$time" } },
        minum: { $min: "$tempereture" },
        maxmum: { $max: "$tempereture" },
        avg: { $avg: "$tempereture" },
        sum: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({ track });
});

module.exports = { createTrack, getAlltracks };
