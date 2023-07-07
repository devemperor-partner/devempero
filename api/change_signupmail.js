const express = require("express");
const Router = express.Router();
const User = require("../model/user");

const verifyToken = require("../token/verify_token");
const { create_mail_options, transporter } = require("../mailer/verify_account");
const User_verification = require("../model/sign_up_verification");
const validate_change_signupmail = require("../validators/validate_change_signupMail");

// /change_signupmail
Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_change_signupmail(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to change your email please login  and try again",
      });

    const user_verification = await User_verification.findOne({
      user: req.body.user,
    });
    if (!user_verification)
      return res.status(400).json({
        error: true,
        errMessage:
          "Seems like your email has been verified, login and try again",
      });

    user.set({ Email: req.body.Email });

    await user.save();
    transporter.sendMail(
      create_mail_options({
        full_name: user.full_name,
        verification_link: user_verification.verification_link,
        reciever: user.Email,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
      },
    );

    res
      .status(200)
      .json({ error: false, message: "You successfully changed your Email" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
