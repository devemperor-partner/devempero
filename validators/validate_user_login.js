const Joi = require("joi");

const validate_user_login = (req) => {
  const Schema = Joi.object({
    Email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }).options({ stripUnknown: true });
  const result = Schema.validate({ Email: req.Email, password: req.password });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_user_login;
