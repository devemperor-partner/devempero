const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verify_token");
const create_withdrawal_request = require("../api_func/create_withdrawal_request");
const validate_withdrawal_request = require("../validators/validate_withdrawal_request");
const {
  create_mail_options,
  transporter,
} = require("../mailer/withdrawal_email");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_withdrawal_request(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "please login again to deposit fund",
      });

    if (parseInt(req.body.withdrawal_amount) < 1000)
      return res.status(400).json({
        error: true,
        errMessage: "Withdrawal Amount can't be lesser than ₦1,000",
      });
    if (parseInt(req.body.withdrawal_amount) < parseInt(user.final_balance))
      return res.status(400).json({
        error: true,
        errMessage: "Insufficient fund,please try again",
      });

    const withdrawal_request = await create_withdrawal_request(req.body);
    if (withdrawal_request.error)
      return res
        .status(400)
        .json({ error: true, errMessage: withdrawal_request.errMessage });

    console.log(withdrawal_request);
    transporter.sendMail(
      create_mail_options({
        full_name: user.full_name,
        withdrawal_amount: req.body.withdrawal_amount,
        // deposit_method: req.deposit_method,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
      },
    );
    res.status(200).json({ error: false, message: withdrawal_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
