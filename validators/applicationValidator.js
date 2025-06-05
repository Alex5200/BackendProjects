const Joi = require('joi');

const applicationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[0-9\s\-\(\)]{7,15}$/),
  message: Joi.string().max(500)
});

module.exports = applicationSchema;
