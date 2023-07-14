const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verify_token");
const validate_learn_coding = require("../validators/validate_learn_coding.js");
// const Coding_lesson = require("../model/coding_lessons");
const {
  handle_online_courses,
  handle_offline_courses,
} = require("../api_func/coding_lessons_func.js");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_learn_coding(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "Please login again to buy a coding course",
      });

    return res
      .status(400)
      .json({
        error: true,
        errMessage:
          "You can't purchase a course from us at the moment as there are none available",
      });

    if (req.body.presence == "Online Presence") {
      const create_online_course_result = await handle_online_courses(req.body);
      if (create_online_course_result.error)
        return res.status(400).json({
          error: true,
          errMessage: create_online_course_result.errMessage,
        });
      return res.status(200).json({ error: false, message: "success" });
    } else {
      const create_offline_course_result = handle_offline_courses(req.body);

      if (create_offline_course_result.error)
        return res.status(400).json({
          error: true,
          errMessage: create_offline_course_result.errMessage,
        });
      return res.status(200).json({ error: false, message: "success" });
    }
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
