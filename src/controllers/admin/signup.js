const { validateAdmin } = require("../../utils/validation/validateAdmin");
const { signup_admin } = require("../../services/admin");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const signup = async (req, res) => {
  try {
    //validate Request Body
    try {
      await validateAdmin(req.body);
    } catch (e) {
      return res
        .status(400)
        .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
    }

    const { error, error_message, data } = await signup_admin(req.body);

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Admin Signup successfully",
      adminUser: data.admin,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = signup;
