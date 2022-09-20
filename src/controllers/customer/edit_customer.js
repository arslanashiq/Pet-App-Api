const { validateEditCustomer } = require("../../utils/validation/customer");
const { EditCustomer } = require("../../services/customer");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");

const edit_customer = async (req, res) => {
    try {
        //validate Request Body
        try {
            await validateEditCustomer(req.body);
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
        }
        const { error, error_message, data } = await EditCustomer(req.body, req.user, req.files);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Customer  Edit Successfully",
            Customer: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = edit_customer;
