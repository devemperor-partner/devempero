const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to account_verification database");
require("./user");
const verify_on_signup_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  verification_link: {
    type: String,
    required: true,
  },
});
const Verify_on_signup = mongoose.model(
  "verify_user_on_signup",
  verify_on_signup_Schema,
);
module.exports = Verify_on_signup;
