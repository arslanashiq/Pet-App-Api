const {
  find_user,
  find_user_by_id,
  signupUser,
} = require("../DAL/user");
const {
  Signup_Customer,
  find_Customer_by_user_id_and_update,
  find_Customer_by_user_id,
  customer_list
} = require("../DAL/customer");
const { UPLOAD_AND_RESIZE_FILE } = require("../utils/utils");
const { add_to_session } = require("../DAL/session");
const jwt = require("jsonwebtoken");
const { CUSTOMER_TYPE } = require("../utils/constants");
const { v1: uuidv1 } = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
// *******************************{Customer SIGN UP}**************************************
const _signupCustomer = async (body, resp) => {
  const user = await find_user(body);
  if (user) {
    resp.error = true;
    resp.error_message = "Email Alreay Exists!";
    return resp;
  }
  body.type = CUSTOMER_TYPE;
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
  let Customer_user = await signupUser(user_obj);
  if (!Customer_user) {
    resp.error = true;
    resp.error_message = "Something went wrong";
    return resp;
  }
  let Students = {
    _id: Customer_user._id,
    email: Customer_user.email,
  };
  // add Students
  const Customer_obj = {
    user_id: Students,
    first_name: body.first_name,
    last_name: body.last_name,
    image: "",
    phone: body.phone,
    location: body.location,
  };
  let Customer_data = await Signup_Customer(Customer_obj);
  if (!Customer_data) {
    resp.error = true;
    resp.error_message = "Something Went Wrong Data Is Not Saved...!";
    return resp;
  }
  //generating token'
  const access = "auth";
  const json_token = uuidv1();
  const token = jwt
    .sign({ login_token: json_token, access }, "3ZGErMDCyxTOZYFr56HGD")
    .toString();
  const add_session = await add_to_session(json_token, Customer_user._id);
  if (!add_session) {
    resp.error = true;
    resp.error_message = "Something get wrong";
    return resp;
  }
  Customer_obj.token = token;
  resp.data = Customer_obj;
  return resp;
};
const signupCustomer = async (body) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _signupCustomer(body, resp);
  return resp;
};
// *******************************{Customer LIST}**************************************
const _getCustomer = async (Limit, page, resp) => {
  ///// pagination
  let limit = parseInt(Limit);
  if (!limit) {
    limit = 15;
  }

  if (page) {
    page = parseInt(page) + 1;
    if (isNaN(page)) {
      page = 1;
    }
  } else {
    page = 1;
  }
  let skip = (page - 1) * limit;

  const customer = await customer_list(skip, limit);
  resp.data = customer;
  return resp;
};
const getCustomer = async (limit, page) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _getCustomer(limit, page, resp);
  return resp;
};
// *******************************{Customer EDIT}**************************************
const _EditCustomer = async (body, user_id, files, resp) => {
  const customer = await find_Customer_by_user_id_and_update(user_id);
  if (!customer) {
    resp.error = true;
    resp.error_message = "No Entry is present Against the id";
    return resp;
  }
  if (
    files == null ||
    files.image == null ||
    files.image == undefined ||
    files.image == " "
  ) {
    resp.error = true;
    resp.error_message = "Please Upload Image";
    return resp;
  }
  let dir = "./src/utils/images/";
  const image_name = await UPLOAD_AND_RESIZE_FILE(files.image.data, dir, {
    width: 200,
  });
  if (image_name == false) {
    resp.error = true;
    resp.error_message = "Something get wrong";
    return resp;
  }
  let image = dir + image_name;
  customer.first_name = body.first_name;
  customer.last_name = body.last_name;
  customer.image = image;
  customer.phone = body.phone;
  customer.location = body.location;
  customer.save();
  resp.data = customer;
  return resp;
};
const EditCustomer = async (body, user_id, files) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };

  resp = await _EditCustomer(body, user_id, files, resp);
  return resp;
};
// *******************************{Customer EDIT}**************************************
const _DetailCustomer = async (user_id, resp) => {
  const customer = await find_Customer_by_user_id(user_id);
  resp.data = customer;
  return resp;
};
const DetailCustomer = async (user_id) => {
  let resp = {
    error: false,
    error_message: "",
    data: {},
  };
  resp = await _DetailCustomer(user_id, resp);
  return resp;
};
module.exports = {
  signupCustomer,
  getCustomer,
  EditCustomer,
  DetailCustomer
};
