const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.generateToken = async (id) => {
    const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY)
    return token
}
