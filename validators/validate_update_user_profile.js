const Joi = require("joi");

const validate_update_user_profile = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.number().required(),
    
  });
  const result = Schema.validate({
    user: req.user,
    full_name: req.full_name,
    email: req.email,
    phone_number: req.phone_number,
    
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_update_user_profile;
