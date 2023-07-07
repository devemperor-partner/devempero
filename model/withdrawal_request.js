const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to withdrawal request database");
require("./user");
require("./transactions");

const withdrawal_schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  withdrawal_amount: {
    type: String,
    required: true,
  },
  withdrawal_method: {
    type: String,
    required: true,
    default: "Bank Transfer",
  },

  Bank_name: {
    type: String,
    required: true,
  },
  Account_name: {
    type: String,
    required: true,
  },
  Account_number: {
    type: String,
    required: true,
  },

  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    required: true,
  },
});

const Withdrawal_Request = mongoose.model(
  "withdrawal_schema",
  withdrawal_schema,
);
module.exports = Withdrawal_Request;
