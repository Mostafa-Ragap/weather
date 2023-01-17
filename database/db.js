const mongoose = require('mongoose')
require('dotenv').config()


const db = mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)

module.exports = db;