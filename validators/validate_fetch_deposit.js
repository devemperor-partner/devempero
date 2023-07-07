const Joi = require("joi");

const validatefetch_depositrequest = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    deposit_request: Joi.string().required().min(0).max(1000),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    deposit_request: req.deposit_request,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validatefetch_depositrequest;
