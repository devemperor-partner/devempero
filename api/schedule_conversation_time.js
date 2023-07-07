const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const App_informations = require("../model/app_informations");
const verifyToken = require("../token/verify_token");
const validate_schedule_time = require("../validators/validate_schedule_time");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_schedule_time(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to schedule time to have conversation with our team, please login and try again",
      });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
