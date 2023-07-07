const bcrypt = require("bcrypt");
const hashpassword = async (password) => {
  const salt_round = 10;
  const salt = await bcrypt.genSalt(salt_round);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
};
module.exports = hashpassword;
