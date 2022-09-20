const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const add_pet = require("../../../controllers/pets/add_pet");
const edit_pet = require("../../../controllers/pets/edit_pet");
const delete_pet = require("../../../controllers/pets/delete_pet");
const detail_pet = require("../../../controllers/pets/detail_pet");
const pet_list_by_pet_category = require("../../../controllers/pets/pet_list_by_pet_category");
const all_pet_list = require("../../../controllers/pets/all_pet_list");
const upload_image = require("../../../controllers/pets/upload_image");
register_route({
    router,
    route: "/add_pet",
    cutsomer_auth_enable: true,
    auth_enable: true,
    post_method: add_pet,
});
register_route({
    router,
    route: "/edit_pet/:id",
    cutsomer_auth_enable: true,
    auth_enable: true,
    put_method: edit_pet,
});
register_route({
    router,
    route: "/delete_pet/:id",
    cutsomer_auth_enable: true,
    auth_enable: true,
    delete_method: delete_pet,
});
register_route({
    router,
    route: "/detail_pet/:id",
    cutsomer_auth_enable: true,
    auth_enable: true,
    get_method: detail_pet,
});
register_route({
    router,
    route: "/upload_image",
    cutsomer_auth_enable: true,
    auth_enable: true,
    post_method: upload_image,
});
register_route({
    router,
    route: "/pet_list_by_pet_category/:id",
    auth_enable: true,
    get_method: pet_list_by_pet_category,
});
register_route({
    router,
    route: "/all_pet_list",
    auth_enable: true,
    get_method: all_pet_list,
});
module.exports = router;