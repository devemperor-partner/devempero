const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const Deposit_request = require("../model/deposit_request");
const verifyToken = require("../token/verify_token");
const validate_completedeposit = require("../validators/validate_completedeposit");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const fs = require("fs");

Router.post("/", upload.any("payment_proof"), verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);

    const request_isvalid = validate_completedeposit(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage:
          "an unexpected error while trying to upload proof of payment, please login and try again",
      });
    const deposit_request = await Deposit_request.findById(
      req.body.deposit_request,
    );
    if (!deposit_request)
      return res.status(400).json({
        error: true,
        errMessage: "The deposit you tried to complete was not found",
      });

    const uploader = async (path) =>
      await cloudinary.uploads(path, "payment_proof");
    let payment_proof;
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      payment_proof = newPath;
      fs.unlinkSync(path);
    }
    console.log(`payment proof: ${payment_proof.url}`);
    if (payment_proof.error)
      return res.status(400).json({
        error: true,
        errMessage:
          "Something went wrong in the server while trying to upload your proof of payment, please make sure the proof uploaded is a photo",
      });

   


    deposit_request.set({ deposit_proof: payment_proof.url });
    console.log(deposit_request);
    await deposit_request.save();
    res.status(200).json({ error: false, message: deposit_request });
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({
        error: true,
        errMessage: `${error.message} please check image to make sure you're submiting a valid picture/image`,
      });
  }
});
module.exports = Router;
