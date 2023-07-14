const Joi = require("joi");

const validate_App_payment = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    App_ID: Joi.string().required(),
    // password: Joi.string().required(),
    // new_password: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
    App_ID: req.App_ID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_App_payment;
