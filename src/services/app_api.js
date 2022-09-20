
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  CUSTOMER_TYPE,
  ADMIN_TYPE,
} = require("../utils/constants");
const {
  add_to_session,
  get_session_by_user_id,
  delete_from_session,
} = require("../DAL/session");
const {
  find_user,
  find_user_by_id
} = require("../DAL/user");
const { detailAdmin } = require("../DAL/admin");
const { find_Customer_by_user_id } = require("../DAL/customer");

const _login_user = async (body, resp) => {
  //
  const user = await find_user(body);
  if (!user) {
    resp.error = true;
    resp.error_message = "Invalid Email Address!";
    return resp;
  }
  if (String(user.type) != String(body.type)) {
    resp.error = true;
    resp.error_message = "Invalid Type!";
    return resp;
  }

  const isValidPassword = await bcrypt.compare(body.password, user.password);

  if (!isValidPassword) {
    resp.error = true;
    resp.error_message = "Invalid Email or Password";
    return resp;
  }

  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, "3ZGErMDCyxTOZYFr56HGD")
    .toString();
  const add_session = await add_to_session(json_token, user._id);

  if (!add_session) {
    resp.error = true;
    resp.error_message = "Login Failed";
    return resp;
  }
  let detail;
  if (user.type == ADMIN_TYPE) {
    detail = await detailAdmin(user._id);
  } else if (user.type == CUSTOMER_TYPE) {
    detail = await find_Customer_by_user_id(user._id);
  }

  resp.data = {
    Access_token: token,
    detail: detail,
  };

  return resp;
};
const login_user = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _login_user(body, resp);
  return resp;
};
// ---------------logout--------------------
const _logout_user = async (user_id, resp) => {
  const session = await get_session_by_user_id(user_id);
  if (!session) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  const delete_session = await delete_from_session(session._id);
  if (!delete_session) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  return resp;
};
const logout_user = async (user_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _logout_user(user_id, resp);
  return resp;
};
// change password
// *****************************{ CHANGE PASSWORD }********************************
const _ChangePassword = async (body, user_id, resp) => {
  if (body.new_password !== body.confirm_password) {
    resp.error = true;
    resp.error_message = "Password And Confirm Password Not Matched";
    return resp;
  }
  if (body.old_password === body.new_password) {
    resp.error = true;
    resp.error_message = "New password should not be the same!";
    return resp;
  }

  let user = await find_user_by_id(user_id);
  if (!user) {
    resp.error = true;
    resp.error_message = "Something Wrong";
    return resp;
  }
  const isValidPassword = await bcrypt.compare(
    body.old_password,
    user.password
  );

  if (!isValidPassword) {
    resp.error = true;
    resp.error_message = "Old Password Is Incorrect";
    return resp;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(body.new_password, salt);
  user = await user.save();
  return resp;
};
const ChangePassword = async (body, user_id) => {
  let resp = {
    error: false,
    auth: true,
    error_message: "",
    data: {},
  };

  resp = await _ChangePassword(body, user_id, resp);
  return resp;
};

module.exports = {
  login_user,
  logout_user,
  ChangePassword
};
