const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const moment = require("moment");

const adminUserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  full_name: {
    type: String,
  },

  profile_image: {
    type: String,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  verification_code: {
    type: String,
    trim: true,
    default: "",
  },
  verification_status: {
    type: Boolean,
    default: false,
  },
});

adminUserSchema.plugin(timestamps);

adminUserSchema.methods.toJSON = function () {
  const adminUser = this;
  const adminUserObject = adminUser.toObject();
  const adminUserJson = _.pick(adminUserObject, [
    "_id",
    "user_id",
    "full_name",
    "profile_image",
    "status",
    "verification_code",
    "verification_status",
    "createdAt",
    "updatedAt",
  ]);
  adminUserJson.createdAt = moment(adminUserJson.createdAt).format(
    "DD:MM:YYYY hh:mm:ss a"
  );
  adminUserJson.updatedAt = moment(adminUserJson.updatedAt).format(
    "DD:MM:YYYY hh:mm:ss a"
  );
  return adminUserJson;
};

const adminUser = mongoose.model("adminUser", adminUserSchema);
exports.AdminUser = adminUser;
