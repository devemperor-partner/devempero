const Joi = require("joi");

const validate_deposit_request = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    deposit_amount: Joi.number().required().min(0),
    deposit_method: Joi.string().required().min(0).max(1000),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    deposit_amount: req.deposit_amount,
    deposit_method: req.deposit_method,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_deposit_request;
