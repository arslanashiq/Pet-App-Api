const bcrypt = require("bcrypt");
const { User } = require("../../src/models/users");

//checking user Existance
const find_user = async (body) => {
  return await User.findOne({ email: body.email });
};
// Get User By Id
const find_user_by_id = async (user_id) => {
  return await User.findOne({ _id: user_id });
};
const delete_user_by_id = async (user_id) => {
  return await User.findByIdAndDelete({ _id: user_id });
};
//craeting admin
const signupUser = async (user_data) => {
  let user = new User(user_data);
  user = await user.save();
  return user;
};

//checking duplication of email
const checking_email_exist = async (email) => {
  return await User.findOne({ email: email });
};

// checking is he can create user
const is_user_authorized = async (userId) => {
  return await User.findOne({ _id: userId, type: 0 });
};

const is_user_authorized_customer = async (userId) => {
  return await User.findOne({ _id: userId, type: 1 });
};

const is_user_authorized_saloon_user = async (userId) => {
  return await User.findOne({ _id: userId, type: 2 });
};

module.exports = {
  signupUser,
  checking_email_exist,
  find_user,
  is_user_authorized,
  find_user_by_id,
  delete_user_by_id,
  is_user_authorized_customer,
  is_user_authorized_saloon_user,
};
