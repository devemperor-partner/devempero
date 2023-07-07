const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Create_website_informations = require("../model/website_informations");
const verifyToken = require("../token/verify_token");
const validate_create_website = require("../validators/validate_create_website.js");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_create_website(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "you can't make thsi request at the moment, please login agan and try again",
      });
    const website_informations = await new Create_website_informations({
      user: req.body.user,
      domain_name: req.body.domain_name,
    });

    await website_informations.save();
    res.status(200).json({ error: false, message: website_informations._id });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
