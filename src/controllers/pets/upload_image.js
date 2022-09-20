const { UploadImage } = require("../../services/pets");
const { RENDER_BAD_REQUEST } = require("../../utils/utils");
const upload_image = async (req, res) => {
    try {
        const { error, error_message, data } = await UploadImage(req.files);
        if (error) {
            return res.status(400).json({
                code: 400,
                message: error_message,
            });
        }

        res.status(200).json({
            code: 200,
            message: "Image Uploaded Succefully",
            Image: data,
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = upload_image;
