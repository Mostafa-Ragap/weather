const Joi = require('joi')

exports.createUserValidator = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(50).email().required(),
    password: Joi.string().min(6).max(50).required(),
    confirmPassword: Joi.ref('password'),
    location:Joi.array().required(),
    role:Joi.string()
})
exports.loginUserValidator = Joi.object({

    email: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).max(50).required(),

})