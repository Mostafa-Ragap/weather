const Joi = require("joi");

exports.createDeviceValidator = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  location: Joi.object().required(),
  serialNumber: Joi.string().min(6).max(200),
});
