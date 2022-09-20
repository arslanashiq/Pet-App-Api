const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const moment = require("moment");
const object = require("joi/lib/types/object");

const customerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: "",
  },
  location: {
    type: String,
    default: "",
  }
});

customerSchema.plugin(timestamps);

customerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  const customerJson = _.pick(customerObject, [
    "_id",
    "user_id",
    "first_name",
    "last_name",
    "image",
    "phone",
    "location",
    "createdAt",
    "updatedAt",
  ]);
  customerJson.createdAt = moment(customerJson.createdAt).format(
    "DD:MM:YYYY hh:mm:ss a"
  );
  customerJson.updatedAt = moment(customerJson.updatedAt).format(
    "DD:MM:YYYY hh:mm:ss a"
  );
  return customerJson;
};
const Customer = mongoose.model("Customers", customerSchema);
exports.Customer = Customer;
