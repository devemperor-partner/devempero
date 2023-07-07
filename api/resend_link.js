const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const validate_user_link_request = require("../validators/validate_user_link_request");
const verifyToken = require("../token/verify_token");
const { create_mail_options, transporter } = require("../mailer/verify_account");

const User_verification = require("../model/sign_up_verification");

const MAX_LOGIN_ATTEMPTS = 3;
const LOGIN_TIMEOUT_MINUTES = 5;

// Rate limiting middleware
const rateLimit = require("express-rate-limit")({
  windowMs: LOGIN_TIMEOUT_MINUTES * 10 * 5000,
  max: MAX_LOGIN_ATTEMPTS,
  message: {
    error: true,
    errMessage: "Link has been Resent. Please try again later.",
  },
});

///result
Router.post("/", rateLimit, verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const request_is_valid = validate_user_link_request(req.body);
    if (request_is_valid != true)
      return res
        .status(400)
        .json({ error: true, errMessage: request_is_valid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res
        .status(400)
        .json({ error: true, errMessage: "Please login again to resend link" });

    const user_verification = await User_verification.findOne({
      user: req.body.user,
    }).populate("user");

    if (!user_verification)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to resend link, seems like your account has been verified.",
      });

    transporter.sendMail(
      create_mail_options({
        full_name: user_verification.user.full_name,
        verification_link: user_verification.verification_link,
        reciever: user_verification.user.Email,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
      },
    );

    res
      .status(200)
      .json({
        error: false,
        message:
          "Email has been Resent successfully, Check your spam box if email is not in your inbox",
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
