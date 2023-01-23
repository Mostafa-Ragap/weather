const Device = require("../models/deviceModel");
const asyncHandler = require("express-async-handler");

const createDevice = asyncHandler(async (req, res, next) => {
  const { name, location, serialNumber } = req.body;
  const userId = req.user.id;
  let checkDevice = await Device.findOne({ serialNumber });
  if (checkDevice)
    return res
      .status(400)
      .json({ message: "this Device already registerd before" });

  const device = await Device.create({ name, serialNumber, location, userId });
  res.status(200).json({ message: "created successfully ", device });
});

const getAllDevice = asyncHandler(async (req, res, next) => {
  const devices = await Device.find();
  res.json({ devices });
});

const getDeviceById = asyncHandler(async (req, res, next) => {
  const { deviceId } = req.params;
  const device = await device.findById(deviceId);
  if (!device) res.status(404).json({ message: "Device not found" });
  res.status(200).json({ device });
});

module.exports = { createDevice, getAllDevice, getDeviceById };
