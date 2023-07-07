const bcrypt = require("bcrypt");
const compare_passsword = async (password, user_password) => {
  const checkPassword = await bcrypt.compare(password, user_password);
  return checkPassword;
};
module.exports=compare_passsword