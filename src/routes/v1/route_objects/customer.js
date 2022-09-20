const router = require("express").Router();
const { register_route } = require("../../../utils/reg_routes");
const signup_customer = require("../../../controllers/customer/signup_customer");
const edit_customer = require("../../../controllers/customer/edit_customer");
const get_customer = require("../../../controllers/customer/get_customer");
const detail_customer = require("../../../controllers/customer/detail_customer");
// *****************************{ADMIN SIDE}****************************************
register_route({
  router,
  route: "/get_customer",
  admin_auth_enable: true,
  auth_enable: true,
  get_method: get_customer,
});
// ************************************{CUSTOMER SIDE}************************************
register_route({
  router,
  route: "/signup_customer",
  auth_enable: false,
  post_method: signup_customer,
});
register_route({
  router,
  route: "/edit_customer",
  customer_auth_enable: true,
  auth_enable: true,
  put_method: edit_customer,
});
register_route({
  router,
  route: "/detail_customer",
  customer_auth_enable: true,
  auth_enable: true,
  get_method: detail_customer,
});
module.exports = router;
