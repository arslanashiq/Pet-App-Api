const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const add_pets_category = require("../../../controllers/pets_category/add_pets_category")
const edit_pets_category = require("../../../controllers/pets_category/edit_pets_category")
const pets_category_list = require("../../../controllers/pets_category/pets_category_list")
const delete_pets_category = require("../../../controllers/pets_category/delete_pets_category")
const detail_pets_category = require("../../../controllers/pets_category/detail_pets_category")
// *****************************{ADMIN SIDE}****************************************
register_route({
    router,
    route: "/add_pets_category",
    admin_auth_enable: true,
    auth_enable: true,
    post_method: add_pets_category,
});
register_route({
    router,
    route: "/edit_pets_category/:id",
    admin_auth_enable: true,
    auth_enable: true,
    put_method: edit_pets_category,
});
register_route({
    router,
    route: "/pets_category_list",
    auth_enable: true,
    get_method: pets_category_list,
});
register_route({
    router,
    route: "/delete_pets_category/:id",
    admin_auth_enable: true,
    auth_enable: true,
    delete_method: delete_pets_category,
});
register_route({
    router,
    route: "/detail_pets_category/:id",
    admin_auth_enable: true,
    auth_enable: true,
    get_method: detail_pets_category,
});
module.exports = router;
