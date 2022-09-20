const { dashboard_admin } = require("../../services/admin");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const dashboard = async (req, res) => {
    try {
        const { error, error_message, data } = await dashboard_admin();
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Admin Dashboard",
            Admin_Dashboard: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = dashboard;
