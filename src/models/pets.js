const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const moment = require("moment");
const object = require("joi/lib/types/object");

const petsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    pets_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PetsCategory",
    },
    pet_name: {
        type: String,
    },
    image: {
        type: Array,
        default: [],
    },
    pet_description: {
        type: String,
        default: "",
    },
    pet_age: {
        type: Number,
        default: "",
    },
    pet_weight: {
        type: String,
        default: "",
    },
    pet_price: {
        type: String,
        default: "",
    },
    pet_breed: {
        type: String,
        default: "",
    },
});

petsSchema.plugin(timestamps);

petsSchema.methods.toJSON = function () {
    const pets = this;
    const petsObject = pets.toObject();
    const petsJson = _.pick(petsObject, [
        "_id",
        "user_id",
        "pets_category_id",
        "pet_name",
        "image",
        "pet_description",
        "pet_age",
        "pet_weight",
        "pet_price",
        "pet_breed",
        "createdAt",
        "updatedAt",
    ]);
    petsJson.createdAt = moment(petsJson.createdAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    petsJson.updatedAt = moment(petsJson.updatedAt).format(
        "DD:MM:YYYY hh:mm:ss a"
    );
    return petsJson;
};
const Pets = mongoose.model("Pets", petsSchema);
exports.Pets = Pets;
