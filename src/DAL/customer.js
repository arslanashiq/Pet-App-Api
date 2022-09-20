const { Customer } = require("../models/customer");

const Signup_Customer = async (Students_data) => {
  const new_Customer = new Customer(Students_data);
  return await new_Customer.save();
};
const customer_list = async (skip, limit) => {
  return await Customer.find().skip(skip).limit(limit)
};
const find_Customer_by_user_id = async (id) => {
  return await Customer.findOne({ user_id: id }).populate("user_id", "email");
};
const find_Customer_by_user_id_and_update = async (id) => {
  return await Customer.findOne({ user_id: id });
};
module.exports = {
  Signup_Customer,
  find_Customer_by_user_id,
  customer_list,
  find_Customer_by_user_id_and_update
};
