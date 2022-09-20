const { PetListByPetCategory } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const pet_list_by_pet_category = async (req, res) => {
    try {
        const { error, error_message, data } = await PetListByPetCategory(
            req.params.id
        );

        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Pets List By Pets Category",
            Pets_List: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = pet_list_by_pet_category;
