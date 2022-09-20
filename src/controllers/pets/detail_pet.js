const { DetailPets } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const detail_pet = async (req, res) => {
    try {
        const { error, error_message, data } = await DetailPets(req.user, req.params.id);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }
        res.status(200).json({
            code: 200,
            message: "Pets  Detail",
            Pets: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = detail_pet;
