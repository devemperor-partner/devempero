const Joi = require("joi");

const validate_course_payment = (req) => {
  const Schema = Joi.object({
    user: Joi.string().required(),
    course_ID: Joi.string().required(),
    // password: Joi.string().required(),
    // new_password: Joi.string().required(),
  });
  const result = Schema.validate({
    user: req.user,
    course_ID: req.course_ID,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_course_payment;
