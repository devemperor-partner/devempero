const Joi = require("joi");

const validate_create_website = (req) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    website_name: Joi.string().required(),
    domain_name: Joi.string().allow(""),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    website_name:req.website_name,
    domain_name: req.domain_name,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_create_website;
