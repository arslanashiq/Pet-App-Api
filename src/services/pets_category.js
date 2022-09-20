const { add_pet_category, pet_category_list,
    find_pets_category_and_update,
    find_pets_category_by_id_and_delete,
    find_pet_category_by_id
} = require("../DAL/pets_category")
const { UPLOAD_AND_RESIZE_FILE } = require("../utils/utils");
// *******************************{ADD PETS CATEGORY}**************************************
const _AddPetsCategory = async (body, files, resp) => {
    if (
        files == null ||
        files.image == null ||
        files.image == undefined ||
        files.image == " "
    ) {
        resp.error = true;
        resp.error_message = "Please Upload Image";
        return resp;
    }
    let dir = "./src/utils/images/";
    const image_name = await UPLOAD_AND_RESIZE_FILE(files.image.data, dir, {
        width: 200,
    });
    if (image_name == false) {
        resp.error = true;
        resp.error_message = "Something get wrong";
        return resp;
    }
    let image = dir + image_name;
    let category_object = {
        pet_category_name: body.pet_category_name,
        pet_category_description: body.pet_category_description,
        image: image,
    }
    let category = await add_pet_category(category_object);
    resp.data = category;
    return resp;
};
const AddPetsCategory = async (body, files) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _AddPetsCategory(body, files, resp);
    return resp;
};
// *******************************{PETS CATEGORY LIST}**************************************
const _PetsCategorylist = async (resp) => {
    let category = await pet_category_list();
    resp.data = category;
    return resp;
};
const PetsCategorylist = async () => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _PetsCategorylist(resp);
    return resp;
};
// *******************************{EDIT PETS CATEGORY}**************************************
const _EditPetsCategory = async (body, files, pets_category_id, resp) => {
    let pets_category = await find_pets_category_and_update(pets_category_id);
    if (!pets_category) {
        resp.error = true;
        resp.error_message = "The Pet Category Against This Id Is not Present";
        return resp;
    }
    if (
        files == null ||
        files.image == null ||
        files.image == undefined ||
        files.image == " "
    ) {
        resp.error = true;
        resp.error_message = "Please Upload Image";
        return resp;
    }
    let dir = "./src/utils/images/";
    const image_name = await UPLOAD_AND_RESIZE_FILE(files.image.data, dir, {
        width: 200,
    });
    if (image_name == false) {
        resp.error = true;
        resp.error_message = "Something get wrong";
        return resp;
    }
    let image = dir + image_name;
    pets_category.pet_category_name = body.pet_category_name;
    pets_category.pet_category_description = body.pet_category_description;
    pets_category.image = image;
    pets_category.save();
    resp.data = pets_category;
    return resp;
};
const EditPetsCategory = async (body, files, pets_category_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _EditPetsCategory(body, files, pets_category_id, resp);
    return resp;
};
// *******************************{DELETE PETS CATEGORY}**************************************
const _DeletePetsCategory = async (pets_category_id, resp) => {
    const pets_category = await find_pets_category_by_id_and_delete(pets_category_id);
    if (!pets_category) {
        resp.error = true;
        resp.error_message = "The Pet Category Against This Id Is not Present";
        return resp;
    }
    resp.data = "DELETE SUCCEFULLY";
    return resp;
};
const DeletePetsCategory = async (pets_category_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _DeletePetsCategory(pets_category_id, resp);
    return resp;
};
// *******************************{DELETE PETS CATEGORY}**************************************
const _DetailPetsCategory = async (pets_category_id, resp) => {
    const pets_category = await find_pet_category_by_id(pets_category_id);
    if (!pets_category) {
        resp.error = true;
        resp.error_message = "The Pet Category Against This Id Is not Present";
        return resp;
    }
    resp.data = pets_category;
    return resp;
};
const DetailPetsCategory = async (pets_category_id) => {
    let resp = {
        error: false,
        error_message: "",
        data: {},
    };
    resp = await _DetailPetsCategory(pets_category_id, resp);
    return resp;
};
module.exports = {
    AddPetsCategory,
    PetsCategorylist,
    EditPetsCategory,
    DeletePetsCategory,
    DetailPetsCategory
}