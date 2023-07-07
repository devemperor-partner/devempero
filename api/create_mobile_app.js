const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Create_app_informations = require("../model/app_informations");
const verifyToken = require("../token/verify_token");
const valdate_create_mobile_app = require("../validators/validate_create_mobile_app.js");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = valdate_create_mobile_app(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "you can't create a mobile app at the moment, please login agan and try again",
      });

    // if (user.final_balance < 1000)
    //   return res.status(400).json({
    //     error: true,
    //     errMessage:
    //       "You must have atleast ₦1,000 in your account to be able to request for an App.",
    //   });
    const app_informations = await new Create_app_informations({
      user: req.body.user,
      app_name: req.body.app_name,
    });
    await app_informations.save();
    res.status(200).json({ error: false, message: app_informations._id });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
