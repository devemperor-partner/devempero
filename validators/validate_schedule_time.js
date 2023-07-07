const Joi = require("joi");
const validate_schedule_conversation_time = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    appID: Joi.string().required().min(0).max(1000),
    available_date: Joi.string().required().min(0).max(1000),
    available_time: Joi.string().required().min(0).max(1000),
    anti_phishing_code: Joi.string().allow(""),
  });
  const result = schema.validate({
    user: req.user,
    appID: req.appID,
    available_date: req.available_date,
    available_time: req.available_time,
    anti_phishing_code: req.anti_phishing_code,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_schedule_conversation_time;
