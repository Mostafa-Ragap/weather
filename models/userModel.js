const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, },
    phone: { type: Number, require: true },
    location: { type: Array },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }

}, { timestamp: true })

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.toJSON = function () {
    const data = this.toObject();
    delete data.password;
    return data;
};
const User = mongoose.model('User', userSchema);

module.exports = User;