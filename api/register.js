const express = require("express");
const Router = express.Router();
const validate_user = require("../validators/validate_user");
const User = require("../model/user");
const { create_mail_options, transporter } = require("../mailer/register_mail");
const {referral_mail_options,referral_transporter}=require("../mailer/referral_mail")
// const sign_up_verification=require("../model/sign_up_verification")
const User_verification = require("../model/sign_up_verification");
const hashpassword = require("../hash/hash_password");
const genToken = require("../token/genToken");

// Rate limiting middleware
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_TIMEOUT_MINUTES = 5;

// Rate limiting middleware
const rateLimit = require("express-rate-limit")({
  windowMs: LOGIN_TIMEOUT_MINUTES * 60 * 5000,
  max: MAX_LOGIN_ATTEMPTS,
  message: {
    error: true,
    errMessage: "Too many Registration attempts. Please try again later.",
  },
});

Router.post("/", rateLimit, async (req, res) => {
  console.log(req.body);
  try {
    const user_isvalid = validate_user(req.body);
    if (user_isvalid != true)
      return res.status(400).json({ error: true, errMessage: user_isvalid });

    const password = await hashpassword(req.body.password);

    const user_exist = await User.findOne({ Email: req.body.Email });
    if (user_exist)
      return res
        .status(400)
        .json({ error: true, errMessage: "User already exist, please login" });

    const user = await new User({
      full_name: req.body.full_name,
      Email: req.body.Email,
      phone_number: req.body.phone_number,
      referral: req.body.referral,
      password: password,
    });

    user.set({ referral_link: `https://devemperor.com?${user._id}` });

    const verification_token = genToken(user._id);
    // let verification_link = `https://devemperor.com/verifymailtoken.html?${verification_token}`;
    let verification_link = `http://localhost:3000/verifymailtoken.html?${verification_token}`;

    const user_verification = await new User_verification({
      user: user._id,
      verification_link: verification_link,
    });

    // await user.save();
    // await verify_account.save();
    await Promise.all([user.save(), user_verification.save()]);
    const token = genToken(user._id);

    if (req.body.referral) {
      const referral = await User.findById(req.body.referral);
      if (user) {
        referral_transporter.sendMail(
          referral_mail_options({
            refferd_user: req.body.full_name,
            // referral: referral.full_name,
            reciever: referral.Email,
          }),
          (err, info) => {
            if (err) return console.log(err.message);
            console.log(info);
          },
        );
      }
    }

    transporter.sendMail(
      create_mail_options({
        full_name: req.body.full_name,
        verification_link,
        reciever: req.body.Email,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
      },
    );

    res.status(200).json({ error: false, message: {  user: user._id }, token});
  } catch (error) {
    return res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;

// let otp = Math.floor(Math.random() * 11000);
