const Joi = require("joi");

function validatePetsCategory(body) {
    const schema = {
        pet_category_name: Joi.string().required().min(2).trim(),
        pet_category_description: Joi.string().required().min(2).trim(),
        image: Joi.string().trim(),
    };
    return Joi.validate(body, schema);
}
function validateEditPetsCategory(body) {
    const schema = {
        pet_category_name: Joi.string().required().min(2).trim(),
        pet_category_description: Joi.string().required().min(2).trim(),
        image: Joi.string().trim(),
    };
    return Joi.validate(body, schema);
}
function validatePets(body) {
    const schema = {
        pets_category_id: Joi.string().required(),
        pet_name: Joi.string().required().min(2).trim(),
        image: Joi.array(),
        pet_description: Joi.string().required().min(2).trim(),
        pet_age: Joi.string().required().trim(),
        pet_weight: Joi.string().required(),
        pet_price: Joi.number().required(),
        pet_breed: Joi.string().required(),
    };
    return Joi.validate(body, schema);
}
function validateEditPets(body) {
    const schema = {
        pets_category_id: Joi.string().required(),
        pet_name: Joi.string().required().min(2).trim(),
        image: Joi.array().required(),
        pet_description: Joi.string().required().min(2).trim(),
        pet_age: Joi.string().required().trim(),
        pet_weight: Joi.string().required(),
        pet_price: Joi.number().required(),
        pet_breed: Joi.string().required(),
    };
    return Joi.validate(body, schema);
}

module.exports = {
    validatePetsCategory,
    validatePets,
    validateEditPetsCategory,
    validateEditPets
};
