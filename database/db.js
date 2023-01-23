const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const db = mongoose.connect(process.env.DATABASE_URL);
module.exports = db;
