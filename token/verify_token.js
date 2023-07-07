const jwt = require("jsonwebtoken");
const privateKey = process.env.privateKey;

const verifyToken = (req, res, next) => {
  // console.log(`body sent:${req.body.token}`);
  try {
    if (!req.body.token)
      return res.status(403).json({
        error: true,
        errMessage:
          "Api token not provided,please login to your account access this api",
      });

    jwt.verify(req.body.token, privateKey);
    next();
  } catch (error) {
    res.status(400).json({
      error: true,
      errMessage: `${error.message}, please login to your account to access this api`,
    });
  }
};
module.exports = verifyToken;
