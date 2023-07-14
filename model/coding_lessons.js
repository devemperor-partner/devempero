const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to user database");
const user = require("./user");
const coding_lesson_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  course_price: {
    type: Number,
    required: true,
  },
  paid_for_course: {
    type: Boolean,
    required: true,
    default: false,
  },
  available_to_user: {
    type: Boolean,
    required: true,
    default: false,
  },
  presence: {
    type: String,
    required: true,
  },
  development_category: {
    type: String,
    required: true,
  },
  special_courses: {
    type: String,
    // required: true,
  },
  coding_experience: {
    type: String,
    required: true,
  },
});

const Coding_lesson = mongoose.model("coding_lesson", coding_lesson_Schema);
module.exports = Coding_lesson;
