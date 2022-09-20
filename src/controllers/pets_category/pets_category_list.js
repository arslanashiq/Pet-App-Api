const { PetsCategorylist } = require("../../services/pets_category");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const pets_category_list = async (req, res) => {
    try {
        const { error, error_message, data } = await PetsCategorylist();
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }
        res.status(200).json({
            code: 200,
            message: "Pets Category list",
            Pets_Category: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = pets_category_list;
