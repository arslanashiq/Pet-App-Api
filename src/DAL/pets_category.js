const { PetsCategory } = require("../models/pets_category")
const add_pet_category = async (pet_category_object) => {
    let category = new PetsCategory(pet_category_object);
    return await category.save();
};
const pet_category_list = async () => {
    return await PetsCategory.find();
};
const find_pet_category_by_id = async (id) => {
    return await PetsCategory.findOne({ _id: id });
};
const find_pets_category_and_update = async (id) => {
    return await PetsCategory.findOne({ _id: id });
};
const find_pets_category_by_id_and_delete = async (id) => {
    return await PetsCategory.findByIdAndDelete(id);
};
const total_pets_category_count = async () => {
    return await PetsCategory.find().countDocuments();
};
module.exports = {
    add_pet_category,
    pet_category_list,
    find_pet_category_by_id,
    find_pets_category_and_update,
    find_pets_category_by_id_and_delete,
    total_pets_category_count
}