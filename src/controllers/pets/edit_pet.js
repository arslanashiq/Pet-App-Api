const { validateEditPets } = require("../../utils/validation/pets_category");
const { EditPets } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const edit_pet = async (req, res) => {
    try {
        //validate Request Body
        try {
            await validateEditPets(req.body);
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
        }
        const { error, error_message, data } = await EditPets(req.body, req.user, req.params.id);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }
        res.status(200).json({
            code: 200,
            message: "Pets  Edit Succefully",
            Pets: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = edit_pet;
