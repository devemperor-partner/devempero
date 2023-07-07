const Joi = require("joi");

const validate_withdrawal_request = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    withdrawal_amount: Joi.number().required().min(0),
    // withdrawal_method: Joi.string().required().min(0).max(1000),
    Bank_name: Joi.string().required().min(0),
    Account_name: Joi.string().required().min(0),
    Account_number: Joi.number().required().min(0),
  });

  const result = schema.validate({
    user: req.user,
    withdrawal_amount: req.withdrawal_amount,
    // withdrawal_method: req.withdrawal_method,
    Bank_name: req.Bank_name,
    Account_name: req.Account_name,
    Account_number: req.Account_number,
  });
  if (result.error) return result.error.message;
  return true;
};

module.exports = validate_withdrawal_request;
