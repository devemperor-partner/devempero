const Joi = require("joi");

const validate_account_verification = (req) => {
  const schema = Joi.object({
    // user: Joi.string().required().min(0).max(1000),
    verification_link: Joi.string().required().min(0).max(1000),
  });
  const result = schema.validate({
    // user: req.user,
    verification_link: req.verification_link,
  });

  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_account_verification;
