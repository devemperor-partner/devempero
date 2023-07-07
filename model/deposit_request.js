const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to deposit request database");
require("./user");
require("./transactions");

const deposit_request_schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  deposit_amount: {
    type: String,
    required: true,
  },
  deposit_method: {
    type: String,
    required: true,
  },

  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    required: true,
  },
  deposit_proof: String,
});

const Deposit_request=mongoose.model("deposit_request",deposit_request_schema)
module.exports=Deposit_request