const { getCustomer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const get_customer = async (req, res) => {
  try {
    const { error, error_message, data } = await getCustomer(
      req.query.limit,
      req.query.page
    );

    if (error) {
      return res.status(400).json({
        code: 400,
        message: error_message,
      });
    }

    res.status(200).json({
      code: 200,
      message: "Customer",
      Customer: data,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = get_customer;
