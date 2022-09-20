const { is_user_authorized_customer } = require("../DAL/user");

const customer_authenticate = async (req, res, next) => {
  try {
    const user_id = req.user;
    let admin = await is_user_authorized_customer(user_id);
    if (!admin) {
      return res
        .status(401)
        .json({ code: 401, message: "You Are Not Authorized" });
    }
    next();
  } catch (e) {
    return res
      .status(401)
      .json({ code: 401, message: "Invalid Token", Error_Error: e });
  }
};

module.exports = { customer_authenticate };
