const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const validate_fetch_softwares = require("../validators/validate_fetch_softwares.js");
const verifyToken = require("../token/verify_token");
const Website_informations = require("../model/website_informations");
const App_informations = require("../model/app_informations");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_fetch_softwares(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "An error was encounterd while trying to proccess your request.",
      });

    const website_informations = await Website_informations.find({
      user: req.body.user,
    });

    const app_informations = await App_informations.find({
      user: req.body.user,
    });
    if (website_informations.length < 1 && app_informations.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "You have not requested for any software at the moment",
      });
    res.status(200).json({
      error: false,
      message: { app_informations, website_informations },
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
