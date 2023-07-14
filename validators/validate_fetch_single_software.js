const Joi = require("joi");

const validate_fetch_single_software = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    software_ID: Joi.string().required().min(0).max(1000),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    software_ID: req.software_ID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_fetch_single_software;
