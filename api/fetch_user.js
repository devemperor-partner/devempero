const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const validate_fetch_users = require("../validators/validate_fetch_users");
const verifyToken = require("../token/verify_token");

Router.post("/", verifyToken, async (req, res) => {
 
  try {
    const request_isvalid = validate_fetch_users(req.body);

    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to retrieve your account",
      });
    res.status(200).json({ error: false, message: user });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
