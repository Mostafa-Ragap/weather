const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },

    serialNumber: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamp: true }
);

deviceSchema.index({ location: "2dsphere" });

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
// loc: {
//   type: { type: String },
//   coordinates: [Number],
// }
