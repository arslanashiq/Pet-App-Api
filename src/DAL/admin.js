const { AdminUser } = require("../../src/models/admin_users");

//creating admin
const signupAdmin = async (body, user_id) => {
  let admin_user = new AdminUser({
    user_id: user_id,
    full_name: body.full_name,
    profile_image: "picture",
    status: body.status,
  });

  admin_user = await admin_user.save();
  return admin_user;
};

// Getting Admin Details
const detailAdmin = async (user_id) => {
  const admin = AdminUser.findOne({ user_id: user_id }).populate(
    "user_id",
    "email"
  );
  return admin;
};
const find_admin_by_user_id = async (user_id) => {
  const admin = AdminUser.findOne({ user_id: user_id });
  return admin;
};
const is_admin_authorized = async (userId) => {
  return await AdminUser.findOne({ _id: userId });
};
module.exports = {
  signupAdmin,
  detailAdmin,
  find_admin_by_user_id,
  is_admin_authorized
};
