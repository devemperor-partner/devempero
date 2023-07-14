const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to user database");
require("./user");

const website_information_schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  website_name: String,
  domain_name: String,
  website_category: String,
  Would_you_need_a_mobile_app_for_this_website_later: String,
  //   Do_you_want_this_mobile_app_to_be_made_available_on_playstore: String,
  What_is_your_budget_for_this_project: String,
  //   Mobile_Operating_System: String,
  What_is_your_business_about: String,
  Why_do_you_need_a_website: String,
  Who_is_your_target_audience: String,
  what_will_make_this_website_stand_out_the_competition: String,
  who_are_your_top_competitors: String,
  What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling:
    String,
  sample_link: String,
  Organization_Name: String,
  Organization_Phone_Number: String,
  Personal_Phone_Number: String,
  Whatsapp_Number: String,
  website_owner: String,

  website_link: String,
  charge: Number,
  made_payment: {
    type: Boolean,
    required: true,
    default: false,
  },
  development_status: {
    type: String,
    enum: ["PENDING", "IN DEVELOPMENT", "PRODUCTION"],
    required: true,
    default: "PENDING",
  },
});

const Website_information = mongoose.model(
  "website_informations",
  website_information_schema,
);
module.exports = Website_information;
