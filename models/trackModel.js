const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  deviceSerial: {
    type: String,
    ref: "Device",
  },
  location: { type: Object },
  tempereture: { type: Number },
  humidity: { type: Number },
  time: { type: Date },
});

trackSchema.index({ location: "2dsphere" });
const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
