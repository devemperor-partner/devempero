const Joi = require("joi");

const validate_user = (req) => {
  const schema = Joi.object({
    full_name: Joi.string().required().min(0).max(1000),
    Email: Joi.string().required().min(0).max(2000),
    phone_number: Joi.string().required().min(0).max(1000),
    // country: Joi.string.required().min(0),
    referral: Joi.string().allow(""),
    password: Joi.string().required().min(0),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    full_name: req.full_name,
    Email: req.Email,
    phone_number: req.phone_number,
    referral: req.referral,
    // country: req.country,
    password: req.password,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user;
