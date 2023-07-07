const mongoose = require("mongoose");
const connect_db = require("./db_connector");
connect_db("connected to deposit request database");
require("./user");
const bank_details_Schema = mongoose.Schema({
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
});

const Bank_details = mongoose.model("bank_details", bank_details_Schema);
module.exports = Bank_details;
