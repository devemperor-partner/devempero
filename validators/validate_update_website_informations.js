const Joi = require("joi");
const validate_update_mobile_app_information = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().min(0).max(1000),
    websiteID: Joi.string().required().min(0).max(1000),
    website_category: Joi.string().required(),

    Would_you_need_a_mobile_app_for_this_website_later: Joi.string().required(),

    // Do_you_want_this_mobile_app_to_be_made_available_on_playstore:
    //   Joi.string().required(),

    What_is_your_budget_for_this_project: Joi.string().required(),

    // Mobile_Operating_System: Joi.string().required(),

    What_is_your_business_about: Joi.string().required(),

    Why_do_you_need_a_website: Joi.string().allow(""),

    Who_is_your_target_audience: Joi.string().allow(""),

    what_will_make_this_website_stand_out_the_competition:
      Joi.string().allow(""),

    who_are_your_top_competitors: Joi.string().allow(""),

    What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling:
      Joi.string().allow(""),

    sample_link: Joi.string().allow(""),
    Organization_Name: Joi.string().allow(""),

    Organization_Phone_Number: Joi.string().allow(""),

    Personal_Phone_Number: Joi.number().required(),

    Whatsapp_Number: Joi.number().required(),
    website_owner: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
    websiteID: req.websiteID,
    website_category: req.website_category,

    Would_you_need_a_mobile_app_for_this_website_later:
      req.Would_you_need_a_mobile_app_for_this_website_later,

    // Do_you_want_this_mobile_app_to_be_made_available_on_playstore:
    //   req.Do_you_want_this_mobile_app_to_be_made_available_on_playstore,

    What_is_your_budget_for_this_project:
      req.What_is_your_budget_for_this_project,

    // Mobile_Operating_System: req.Mobile_Operating_System,

    What_is_your_business_about: req.What_is_your_business_about,

    Why_do_you_need_a_website: req.Why_do_you_need_a_website,

    Who_is_your_target_audience: req.Who_is_your_target_audience,

    what_will_make_this_website_stand_out_the_competition:
      req.what_will_make_this_website_stand_out_the_competition,

    who_are_your_top_competitors: req.who_are_your_top_competitors,

    What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling:
      req.What_would_you_like_to_have_on_your_website_regarding_to_branding_and_styling,

    sample_link: req.sample_link,
    Organization_Name: req.Organization_Name,

    Organization_Phone_Number: req.Organization_Phone_Number,

    Personal_Phone_Number: req.Personal_Phone_Number,

    Whatsapp_Number: req.Whatsapp_Number,
    website_owner: req.website_owner,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_update_mobile_app_information;
