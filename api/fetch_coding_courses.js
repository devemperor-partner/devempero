const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Coding_lessons = require("../model/coding_lessons");
const validate_fetch_coding_courses = require("../validators/validate_user_link_request");
const validate_fetch_single_codingCourse = require("../validators/validate_fetch_single_codingCourse");
const verifyToken = require("../token/verify_token");

Router.post("/", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_fetch_coding_courses(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "Please login again to buy a coding course",
      });

    const coding_lessons = await Coding_lessons.find({ user: req.body.user });
    if (coding_lessons.length < 1)
      return res.status(400).json({
        error: true,
        errMessage:
          "No lesson is associated with your account, click on learn coding to buy a new coding course",
      });

    res.status(200).json({
      error: false,
      // errMessage:'nothing was found'
      message: coding_lessons,
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/fetch_single_course", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_fetch_single_codingCourse(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "Please login again to buy a coding course",
      });

    const coding_lesson = await Coding_lessons.findById(req.body.coding_course);
    if (!coding_lesson)
      return res.status(400).json({
        error: true,
        errMessage: "the coding course you requested to pay for was not found",
      });

    res.status(200).json({
      error: false,
      message: coding_lesson,
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
