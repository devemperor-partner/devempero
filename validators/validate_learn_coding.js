const Joi = require("joi");

const validate_learn_coding = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    presence: Joi.string().required().min(0).max(1000),
    development_category: Joi.string().required().min(0).max(1000),
    special_courses: Joi.string().allow("").min(0).max(1000),
    // course_price: Joi.number().required().min(0).max(1000),
    coding_experience: Joi.string().required().min(0).max(1000),
  }).options({ stripUnknown: true });
  const result = schema.validate({
    user: req.user,
    presence: req.presence,
    development_category: req.development_category,
    special_courses: req.special_courses,
    coding_experience: req.coding_experience,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_learn_coding;
