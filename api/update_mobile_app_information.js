const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const App_informations = require("../model/app_informations");
const verifyToken = require("../token/verify_token");
const valdate_create_mobile_app = require("../validators/validate_update_mobile_app_information.js");

Router.post("/", verifyToken, async (req, res) => {
    console.log(req.body)
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

    const app = await App_informations.findOne({
      _id: req.body.appID,
      user: req.body.user,
    });
    if (!app)
      return res.status(400).json({
        error: true,
        errMessage:
          "There was an issue with the app you tried to request for, please start all over again",
      });

    app.set({
      mobile_app_category: req.body.mobile_app_category,

      Would_you_need_a_website_for_this_app_later:
        req.body.Would_you_need_a_website_for_this_app_later,

      Do_you_want_this_mobile_app_to_be_made_available_on_playstore:
        req.body.Do_you_want_this_mobile_app_to_be_made_available_on_playstore,

      What_is_your_budget_for_this_project:
        req.body.What_is_your_budget_for_this_project,

      Mobile_Operating_System: req.body.Mobile_Operating_System,

      What_is_your_business_about: req.body.What_is_your_business_about,

      Why_do_you_need_a_mobile_app: req.body.Why_do_you_need_a_mobile_app,

      Who_is_your_target_audience: req.body.Who_is_your_target_audience,

      what_will_make_this_mobile_app_stand_out_the_competition:
        req.body.what_will_make_this_mobile_app_stand_out_the_competition,

      who_are_your_top_competitors: req.body.who_are_your_top_competitors,

      What_would_you_like_to_have_on_your_mobile_app_regarding_to_branding_and_styling:
        req.body
          .What_would_you_like_to_have_on_your_mobile_app_regarding_to_branding_and_styling,
      sample_link: req.body.sample_link,
      Organization_Name: req.body.Organization_Name,

      Organization_Phone_Number: req.body.Organization_Phone_Number,

      Personal_Phone_Number: req.body.Personal_Phone_Number,

      Whatsapp_Number: req.body.Whatsapp_Number,
    });

    await app.save();
    console.log(app)
    res.status(200).json({ error: false, message: app._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
