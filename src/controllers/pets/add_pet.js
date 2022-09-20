const { validatePets } = require("../../utils/validation/pets_category");
const { AddPets } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const add_pet = async (req, res) => {
    try {
        //validate Request Body
        try {
            await validatePets(req.body);
        } catch (e) {
            return res
                .status(400)
                .json({ code: 400, message: e.details[0].message.replace(/\"/g, "") });
        }
        const { error, error_message, data } = await AddPets(req.body, req.user);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Pets  Added Succefully",
            Pets: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = add_pet;
