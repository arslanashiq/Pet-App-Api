const { Pets } = require("../models/pets");
const add_pet = async (pet_object) => {
    let pets = new Pets(pet_object);
    return await pets.save();
};
const find_pet_list_by_pets_category_id = async (pet_category_id) => {
    return await Pets.find({ pets_category_id: pet_category_id })
};
const all_pet_list = async () => {
    return await Pets.find()
};
const find_pets_by_id_and_user_id = async (pets_id, user_id) => {
    return await Pets.findOne({ _id: pets_id, user_id: user_id })
};
const delete_pets_by_id_and_user_id = async (pets_id, user_id) => {
    return await Pets.findByIdAndDelete({ _id: pets_id, user_id: user_id })
};
module.exports = {
    add_pet,
    find_pet_list_by_pets_category_id,
    all_pet_list,
    find_pets_by_id_and_user_id,
    delete_pets_by_id_and_user_id
}