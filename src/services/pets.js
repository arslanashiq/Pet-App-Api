const { add_pet, find_pet_list_by_pets_category_id, all_pet_list, find_pets_by_id_and_user_id,
    delete_pets_by_id_and_user_id } = require("../DAL/pets")
const { find_pet_category_by_id } = require("../DAL/pets_category");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dgpah6oqs',
    api_key: '541973351462813',
    api_secret: 'vVj5zNpdIKeKhRcq412PJnaCL9Y',
});
// *******************************{ADD PETS}**************************************
const _AddPets = async (body, user_id, resp) => {
    let pets_category = await find_pet_category_by_id(body.pets_category_id);
    if (!pets_category) {
        resp.error = true;
        resp.error_message = "The Pets Category is not Present against this id";
        return resp;
    }
    let pet_object = {
        user_id: user_id,
        pets_category_id: body.pets_category_id,
        pet_name: body.pet_name,
        image: body.image,
        pet_description: body.pet_description,
        pet_age: body.pet_age,
        pet_weight: body.pet_weight,
        pet_price: body.pet_price,
        pet_breed: body.pet_breed,
    }
    let pets = await add_pet(pet_object);
    resp.data = pets;
    return resp;
};
const AddPets = async (body, user_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _AddPets(body, user_id, resp);
    return resp;
};
// *******************************{PETS LIST BY PETS CATEGORY ID}**************************************
const _PetListByPetCategory = async (pet_category_id, resp) => {
    let pets = await find_pet_list_by_pets_category_id(pet_category_id);
    resp.data = pets;
    return resp;
};
const PetListByPetCategory = async (pet_category_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _PetListByPetCategory(pet_category_id, resp);
    return resp;
};
// *******************************{PETS LIST}**************************************
const _AllPetList = async (resp) => {
    let pets = await all_pet_list();
    resp.data = pets;
    return resp;
};
const AllPetList = async () => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _AllPetList(resp);
    return resp;
};
// *******************************{UPLOAD PETS MULTIPLE IMAGES}**************************************
const _UploadImage = async (files, resp) => {
    let image = {};
    const file = files.image;
    const check = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => { })
    resp.data = check.url;
    return resp;
};
const UploadImage = async (files) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _UploadImage(files, resp);
    return resp;
};
// *******************************{EDIT PETS}**************************************
const _EditPets = async (body, user_id, pets_id, resp) => {
    const pets = await find_pets_by_id_and_user_id(pets_id, user_id)
    if (!pets) {
        resp.error = true;
        resp.error_message = "The Pets  is not Present against this id";
        return resp;
    }
    let pets_category = await find_pet_category_by_id(body.pets_category_id);
    if (!pets_category) {
        resp.error = true;
        resp.error_message = "The Pets Category is not Present against this id";
        return resp;
    }
    pets.pets_category_id = body.pets_category_id;
    pets.pet_name = body.pet_name;
    pets.image = body.image;
    pets.pet_description = body.pet_description;
    pets.pet_age = body.pet_age;
    pets.pet_weight = body.pet_weight;
    pets.pet_price = body.pet_price;
    pets.pet_breed = body.pet_breed;
    resp.data = pets;
    return resp;
};
const EditPets = async (body, user_id, pets_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _EditPets(body, user_id, pets_id, resp);
    return resp;
};
// *******************************{DELETE PETS}**************************************
const _DeletePets = async (user_id, pets_id, resp) => {
    const pets = await delete_pets_by_id_and_user_id(pets_id, user_id);
    if (!pets) {
        resp.error = true;
        resp.error_message = "The Pets  is not Present against this id";
        return resp;
    }
    resp.data = "Pets Deleted Succefully";
    return resp;
};
const DeletePets = async (user_id, pets_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _DeletePets(user_id, pets_id, resp);
    return resp;
};
// *******************************{DETAIL PETS}**************************************
const _DetailPets = async (user_id, pets_id, resp) => {
    const pets = await find_pets_by_id_and_user_id(pets_id, user_id);
    if (!pets) {
        resp.error = true;
        resp.error_message = "The Pets  is not Present against this id";
        return resp;
    }
    resp.data = pets;
    return resp;
};
const DetailPets = async (user_id, pets_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _DetailPets(user_id, pets_id, resp);
    return resp;
};
module.exports = {
    AddPets,
    PetListByPetCategory,
    AllPetList,
    UploadImage,
    EditPets,
    DeletePets,
    DetailPets
}