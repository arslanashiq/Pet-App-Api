const { DeletePets } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const delete_pet = async (req, res) => {
    try {
        const { error, error_message, data } = await DeletePets(req.user, req.params.id);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }
        res.status(200).json({
            code: 200,
            message: "Pets  Deleted Succefully",
            Pets: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = delete_pet;
