const { validatePetsCategory } = require("../../utils/validation/pets_category");
const { AddPetsCategory } = require("../../services/pets_category");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const add_pets_category = async (req, res) => {
    try {
        //validate Request Body
        try {
            await validatePetsCategory(req.body);
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
        }
        const { error, error_message, data } = await AddPetsCategory(req.body, req.files);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Pets Category Added Succefully",
            Pets_Category: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = add_pets_category;
