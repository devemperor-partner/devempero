const Joi = require("joi");
const validate_change_signupmail = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    Email: Joi.string().email().required().min(0),
  }).options({ stripUnknown: true });

 const result = schema.validate({
   user: req.user,
   Email: req.Email,
 });
    if (result.error) return result.error.message;
    return true;
};

module.exports = validate_change_signupmail;
