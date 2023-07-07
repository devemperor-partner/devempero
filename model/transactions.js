const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to transaction database");

require("./deposit_request");
require("./withdrawal_request");
require("./user");
const transaction_Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  deposit_request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "deposit_request",
  },

  withdrawal_request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "withdrawal_request",
  },

  refrence: {
    type: String,
    required: true,
  },
  transaction_date: {
    type: String,
    required: true,
    // default: Date.now(),
  },
  amount: Number,
  debit: String,
  credit: String,
  status: {
    type: String,
    required: true,
    enum: ["pending", "success", "failed"],
  },
});

const Transaction = mongoose.model("transaction", transaction_Schema);
module.exports = Transaction;
