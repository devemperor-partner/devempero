const Joi = require("joi");
const validate_user = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    coding_course: Joi.string().required().min(0).max(1000),
  }).options({ stripUnknown: true });

  const result = schema.validate({
    user: req.user,
    coding_course: req.coding_course,
  });
  if (result.error) return result.error.message;
  return true;
};

module.exports = validate_user;
