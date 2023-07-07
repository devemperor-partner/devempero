const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verify_token");
const create_deposit_request = require("../api_func/create_deposit_request");
const validate_deposit_request = require("../validators/validate_deposit_request");
const { create_mail_options, transporter } = require("../mailer/deposit_email");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_deposit_request(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "please login again to deposit fund",
      });

    if (parseInt(req.body.deposit_amount) < 1000)
      return res.status(400).json({
        error: true,
        errMessage:
          "deposit amount must not be lesser than minimum deposit of ₦1,000",
      });
    const create_deposit_result = await create_deposit_request(req.body);
    // console.log(
    //   "create deposit request",
    //   create_deposit_request,
    // );
    if (create_deposit_result.error)
      return res.status({
        error: true,
        errMessage: create_deposit_request.errMessage,
      });

    transporter.sendMail(
      create_mail_options({
        full_name: user.full_name,
        deposit_amount: req.body.deposit_amount,
        // deposit_method: req.deposit_method,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
      },
    );
    res
      .status(200)
      .json({ error: false, message: create_deposit_result.message.deposit_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
