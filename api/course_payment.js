const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const validate_course_payment = require("../validators/validate_course_payment.js");
// const validate_app_payment = require("../validators/validate_app_payment.js");

const Course = require("../model/coding_lessons");
const verifyToken = require("../token/verify_token");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_course_payment(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "Please login again before you request to pay for a course.",
      });

    const course = await Course.findById(req.body.course_ID);
    if (!course)
      return res.status(400).json({
        error: true,
        errMessage:
          "The course you tried to purchase was not found, please try again",
      });

    // if (!course.charge)
    //   return res.status(400).json({
    //     error: true,
    //     message:
    //       "No charges has been placed on the website you requested to pay for",
    //   });

    if (parseInt(course.course_price) > parseInt(user.final_balance))
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund,Please wait while we redirect you to deposit funds to your account",
        insufficient_fund: true,
      });

    user.set({
      final_balance:
        parseInt(user.final_balance) - parseInt(course.course_price),
    });

    course.set({
      paid_for_course: true,
      available_to_user: true,
    });

    Promise.all([await user.save(), await course.save()]);
    return res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

// Router.post("/app_payment", verifyToken, async (req, res) => {
//   try {
//     const request_isvalid = validate_app_payment(req.body);
//     if (request_isvalid != true)
//       return res.status(400).json({ error: true, errMessage: request_isvalid });

//     const user = await User.findById(req.body.user);
//     if (!user)
//       return res.status(403).json({
//         error: true,
//         errMessage:
//           "Please login again before you request to pay for a software.",
//       });

//     const app_information = await App_informations.findById(req.body.App_ID);
//     if (!app_information)
//       return res.status(400).json({
//         error: true,
//         errMessage:
//           "Informations about the website you requested to pay for was not found, please try again",
//       });

//     if (!app_information.charge)
//       return res.status(400).json({
//         error: true,
//         message:
//           "No charges has been placed on the website you requested to pay for",
//       });

//     if (parseInt(app_information.charge) > parseInt(user.final_balance))
//       return res.status(400).json({
//         error: true,
//         errMessage:
//           "Insufficient fund,Please wait while we redirect you to deposit funds to your account",
//         insufficient_fund: true,
//       });

//     user.set({
//       final_balance:
//         parseInt(user.final_balance) - parseInt(app_information.charge),
//     });

//     app_information.set({
//       made_payment: true,
//     });

//     Promise.all([await user.save(), await app_information.save()]);
//     return res.status(200).json({ error: false, message: "success" });
//   } catch (error) {
//     res.status(400).json({ error: true, errMessage: error.message });
//   }
// });

module.exports = Router;
