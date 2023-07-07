const Withdrawal_request = require("../model/withdrawal_request");
const Transaction = require("../model/transactions");
const Bank_details = require("../model/bank_details");
const { datetime } = require("./system-variable");

const create_withdrawal_request = async (req) => {
  try {
    const transaction = await new Transaction({
      user: req.user,
      refrence: "Withdrawal Requested",
      transaction_date: datetime,
      amount: req.withdrawal_amount,
      debit: `₦${req.withdrawal_amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      status: "pending",
    });

    const withdrawal_request = await new Withdrawal_request({
      user: req.user,
      withdrawal_amount: req.withdrawal_amount,
      //    withdrawal_method: req.withdrawal_method,
      Bank_name: req.Bank_name,
      Account_name: req.Account_name,
      Account_number: req.Account_number,
      transaction: transaction._id,
    });
    const bank_details = await new Bank_details({
      Bank_name: req.Bank_name,
      Account_name: req.Account_name,
      Account_number: req.Account_number,
    });

    transaction.set({ withdrawal_request: withdrawal_request._id });
    Promise.all([
      transaction.save(),
      withdrawal_request.save(),
      bank_details.save(),
    ]);
    return {
      error: false,
      message: { transaction, withdrawal_request, bank_details },
    };
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};
module.exports = create_withdrawal_request;
