const Deposit_request = require("../model/deposit_request");
const Transaction = require("../model/transactions");
const {
  datetime,

  coded_date,
} = require("./system-variable");

const create_deposit_request = async (req) => {
  try {
    const transaction = await new Transaction({
      user: req.user,
      refrence: "made Deposit",
      transaction_date: datetime,
      amount: req.deposit_amount,
      credit: `₦${req.deposit_amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      status: "pending",
    });

   
    const deposit_request = await new Deposit_request({
      user: req.user,
      deposit_amount: req.deposit_amount,
      deposit_method: req.deposit_method,
      transaction: transaction._id,
    });

    transaction.set({ deposit_request: deposit_request._id });

    //  console.log(
    //    "called",
    //    `transaction:${transaction}`,
    //    `depoit_request:${deposit_request}`,
    //  );

    Promise.all([transaction.save(), deposit_request.save()]);
    return { error: false, message: { deposit_request, transaction } };
  } catch (error) {
    return { error: true, errMessage: error.message };
  }
};
module.exports = create_deposit_request;
