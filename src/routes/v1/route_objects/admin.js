const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const signup = require("../../../controllers/admin/signup");
const dashboard = require("../../../controllers/admin/dashboard");
register_route({
  router,
  route: "/signup_admin",
  auth_enable: false,
  post_method: signup,
});
register_route({
  router,
  route: "/dashboard",
  auth_enable: true,
  admin_auth_enable: true,
  get_method: dashboard,
});
module.exports = router;
