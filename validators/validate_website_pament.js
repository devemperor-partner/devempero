const Joi = require("joi");

const validate_website_payment = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    website_ID: Joi.string().required(),
    // password: Joi.string().required(),
    // new_password: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
    website_ID: req.website_ID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_website_payment;
