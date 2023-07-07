const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Deposit_request = require("../model/deposit_request");
const validate_fetch_deposit = require("../validators/validate_fetch_deposit.js");
const verifyToken = require("../token/verify_token");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_fetch_deposit(req.body);

    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to proccess your request.",
      });
    const deposit_request = await Deposit_request.findById(
      req.body.deposit_request,
    );
    if (!deposit_request)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to proccess your request ",
      });

    res.status(200).json({ error: false, message: deposit_request });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
