const { AllPetListByUserId } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const all_pet_list_by_user_id = async (req, res) => {
    try {
        const { error, error_message, data } = await AllPetListByUserId(req.user);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Pets List By User Id",
            Pets_List: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = all_pet_list_by_user_id;
