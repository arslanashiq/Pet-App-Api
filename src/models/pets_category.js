const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const moment = require("moment");
const object = require("joi/lib/types/object");

const petsCategorySchema = new mongoose.Schema({
    pet_category_name: {
        type: String,
    },
    pet_category_description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
});
petsCategorySchema.plugin(timestamps);

petsCategorySchema.methods.toJSON = function () {
    const PetsCategory = this;
    const PetsCategoryObject = PetsCategory.toObject();
    const PetsCategoryJson = _.pick(PetsCategoryObject, [
        "_id",
        "pet_category_name",
        "pet_category_description",
        "image",
        "createdAt",
        "updatedAt",
    ]);
    PetsCategoryJson.createdAt = moment(PetsCategoryJson.createdAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    PetsCategoryJson.updatedAt = moment(PetsCategoryJson.updatedAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    return PetsCategoryJson;
};
const PetsCategory = mongoose.model("PetsCategory", petsCategorySchema);
exports.PetsCategory = PetsCategory;
