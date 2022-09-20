const { signupAdmin } = require("../DAL/admin");
const { signupUser, checking_email_exist } = require("../DAL/user");
const bcrypt = require("bcrypt");
const { add_to_session } = require("../DAL/session");
const { total_customer_count } = require("../DAL/customer");
const { total_pets_category_count } = require("../DAL/pets_category");
const { total_pets_count } = require("../DAL/pets");
const { v1: uuidv1 } = require("uuid");
const jwt = require("jsonwebtoken");
const { google } = require('googleapis');
require('dotenv').config();
// signup admin
const _signup_admin = async (body, resp) => {
  const checkingemailexist = await checking_email_exist(body.email);
  if (checkingemailexist) {
    resp.error = true;
    resp.error_message = "Email already exist";
    return resp;
  }
  body.status = true;
  // signup new user
  let user_obj = {
    email: body.email,
    password: body.password,
    type: body.type,
    status: body.status,
  };
  if (body.password != body.confirm_password) {
    resp.error = true;
    resp.error_message = "password and confirm password not matched";
    return resp;
  }
  let salt = await bcrypt.genSalt(10);
  user_obj.password = await bcrypt.hash(user_obj.password, salt);
  let user = await signupUser(user_obj);
  if (!user) {
    resp.error = true;
    resp.error_message = "Admin sign up failed";
    return resp;
  }
  const admin = await signupAdmin(body, user._id);
  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, "3ZGErMDCyxTOZYFr56HGD")
    .toString();
  const add_session = await add_to_session(json_token, user._id);
  if (!add_session) {
    resp.error = true;
    resp.error_message = "Something get wrong";
    return resp;
  }
  const admin_object = {
    admin_data: admin,
    token: token
  }
  resp.data = {
    admin: admin_object,
  };
  return resp;
};
const signup_admin = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _signup_admin(body, resp);
  return resp;
};
const _dashboard_admin = async (resp) => {

  let total_customer = await total_customer_count();
  let total_pets_category = await total_pets_category_count();
  let total_pets = await total_pets_count();
  resp.data = {
    Total_customer: total_customer,
    Total_pets_category: total_pets_category,
    Total_pets: total_pets,
  };
  return resp;
};
const dashboard_admin = async () => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _dashboard_admin(resp);
  return resp;
};
module.exports = {
  signup_admin,
  dashboard_admin
};
