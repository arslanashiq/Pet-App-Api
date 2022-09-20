const { validateEditPetsCategory } = require("../../utils/validation/pets_category");
const { EditPetsCategory } = require("../../services/pets_category");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const edit_pets_category = async (req, res) => {
    try {
        //validate Request Body
        try {
            await validateEditPetsCategory(req.body);
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
        }
        const { error, error_message, data } = await EditPetsCategory(req.body, req.files, req.params.id);
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

module.exports = edit_pets_category;
