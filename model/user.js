const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to user database");

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    minLength: 3,
  },

  Email: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    minLength: 0,
  },
  user_icon:{
    type: String,
    required: true,
    default:"css/assets/user.png"
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  referral_link: {
    type: String,
    required: true,
  },
  passport: String,

  account_is_verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  final_balance: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  softwares: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  courses: { 
    type: Number,
     required: true,
      min: 0,
       default: 0
       },
  // verification_link: String,
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = User;
