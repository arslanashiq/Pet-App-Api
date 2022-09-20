const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const login = require("../../../controllers/app_api/login");
const logout = require("../../../controllers/app_api/logout");
const change_password = require("../../../controllers/app_api/change_password");

register_route({
  router,
  route: "/login",
  auth_enable: false,
  post_method: login,
});
register_route({
  router,
  route: "/logout",
  auth_enable: true,
  get_method: logout,
});
register_route({
  router,
  route: "/change_password",
  auth_enable: true,
  post_method: change_password,
});
module.exports = router;
