const express = require("express");
const Router = express.Router();
const genToken = require("../token/genToken");
const User = require("../model/user");
const validate_user_login = require("../validators/validate_user_login");
const compare_passsword = require("../hash/compare_password");

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_TIMEOUT_MINUTES = 5;

// Rate limiting middleware
const rateLimit = require("express-rate-limit")({
  windowMs: LOGIN_TIMEOUT_MINUTES * 60 * 5000,
  max: MAX_LOGIN_ATTEMPTS,
  message: {
    error: true,
    errMessage: "Too many login attempts. Please try again later.",
  },
});

Router.post("/", rateLimit, async (req, res) => {
  try {
    const request_isvalid = validate_user_login(req.body);
    if (request_isvalid !== true) {
      return res.status(400).json({ error: true, errMessage: request_isvalid });
    }

    const user = await User.findOne({ Email: req.body.Email });
    if (!user) {
      return res.status(400).json({
        error: true,
        errMessage: "Invalid Email or password",
      });
    }

    // const password_match = await bcrypt.compare(
    //   req.body.password,
    //   user.password,
    // );
    const password_match = await compare_passsword(
      req.body.password,
      user.password,
    );

    if (password_match != true) {
      return res.status(400).json({
        error: true,
        errMessage: "Invalid user name or password",
      });
    }
   
    const token = genToken(user._id);
    console.log(token);
    res.status(200).json({
      error: false,
      message: {
        user: user._id,
        account_is_verified: user.account_is_verified,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;

// console
