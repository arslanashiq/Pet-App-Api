const { AllPetList } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const all_pet_list = async (req, res) => {
    try {
        const { error, error_message, data } = await AllPetList();
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Pets List",
            Pets_List: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = all_pet_list;
