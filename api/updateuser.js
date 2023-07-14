const express = require("express");
const Router = express.Router();
const verifyToken = require("../token/verify_token");
const User = require("../model/user");
const validate_user_update_profile = require("../validators/validate_update_user_profile");
const validate_user_update_password = require("../validators/validate_user_update_password");
const validate_change_profile = require("../validators/validate_change_profile");
const verifyPassword = require("../hash/compare_password");
const hashpassword = require("../hash/hash_password");

const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const fs = require("fs");

Router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const req_isvalid = validate_user_update_profile(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "invalid request, please login again to update your profile information",
      });
    if (user.email != req.body.email) {
      user.set({ changed_mail: true });
    }
    user.set({
      Email: req.body.email,
      full_name: req.body.full_name,
      phone_number: req.body.phone_number,
      // last_name:req.body.last_name,
    });
    await user.save();
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post(
  "/changeUserProfile",
  upload.any("profile_photo"),
  verifyToken,
  async (req, res) => {
    try {
      console.log(req.files);
      const req_isvalid = validate_change_profile(req.body);
      if (req_isvalid != true)
        return res.status(400).json({ error: true, errMessage: req_isvalid });

      const user = await User.findById(req.body.user);
      if (!user)
        return res.status(400).json({
          error: true,
          errMessage:
            "An unexpected error occured while trying to upload a new profile, please login and try again",
        });

      const uploader = async (path) =>
        await cloudinary.uploads(path, "profile_photo");
      let profile_photo;
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        profile_photo = newPath;
        fs.unlinkSync(path);
      }
      console.log(`profile_photo: ${profile_photo.url}`);
      if (profile_photo.error)
        return res.status(400).json({
          error: true,
          errMessage:
            "Something went wrong in the server while trying to upload your profile photo, please make sure what you try uploading is a photo",
        });

      user.set({ user_icon: profile_photo.url });
      await user.save();
      res.status(200).json({ error: false, message: profile_photo.url });
    } catch (error) {
      res.status(400).json({ error: true, errMessage: error.message });
    }
  },
);

Router.post("/update_password", verifyToken, async (req, res) => {
  console.log("password", req.body.password);
  console.log("new password", req.body.new_password);
  const req_isvalid = validate_user_update_password(req.body);
  if (req_isvalid != true)
    return res.status(400).json({ error: true, errMessage: req_isvalid });

  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "invalid request, please login again to update your profile information",
      });
    console.log(user.password);
    const passwordIsverified = await verifyPassword(
      req.body.password,
      user.password,
    );
    console.log(passwordIsverified);
    if (passwordIsverified != true)
      return res.status(400).json({
        error: true,
        errMessage: "invalid password, please try again ",
      });
    const password = await hashpassword(req.body.new_password);
    console.log(password);
    await user.set({
      password: password,
    });
    await user.save();
    res.status(200).json({ error: false, message: "success." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
