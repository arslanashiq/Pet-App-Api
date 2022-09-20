const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const signup = require("../../../controllers/admin/signup");
register_route({
  router,
  route: "/signup_admin",
  auth_enable: false,
  post_method: signup,
});
module.exports = router;
