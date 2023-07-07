const express = require("express");
const verifyToken = require("../token/verify_token");
const validate_account_verification = require("../validators/validate_account_verification");
const Account_verification = require("../model/sign_up_verification");
const User = require("../model/user");
const Router = express.Router();

Router.post("/",  async (req, res) => {
  try {
    const req_isvalid = validate_account_verification(req.body);
    if (req_isvalid != true)
      return res.status(400).json({ error: true, errMessage: req_isvalid });

    const account_verification_isfound = await Account_verification.findOne({
      // user: req.body.user,
      verification_link: req.body.verification_link,
    });

    if (!account_verification_isfound)
      return res.status(400).json({
        error: true,
        errMessage: "The link you followed is broken or it no longer exist",
      });
    const user = await User.findById(account_verification_isfound.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "Something went wrong, please login again to verify your account",
      });
      await Account_verification.findByIdAndDelete(
        account_verification_isfound._id,
      );
    await user.set({ account_is_verified: true });
    await user.save();
    res.status(200).json({ error: false, message: "verified" });
  } catch (error) {
    return res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
