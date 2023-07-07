const Joi = require("joi");

const validate_create_mobile_app = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    app_name: Joi.string().required(),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    app_name: req.app_name,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_create_mobile_app;
