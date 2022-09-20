const admin = require("./route_objects/admin");
const index = require("../index");
const app_api = require("./route_objects/app_api");
const customer = require("./route_objects/customer");
const pets_category = require("./route_objects/pets_category");
const pets = require("./route_objects/pets");
const v1_routes = (app) => {
  app.use("/", index);
  app.use("/api/app_api", app_api);
  app.use("/api/admin", admin);
  app.use("/api/customer", customer);
  app.use("/api/pets_category", pets_category);
  app.use("/api/pets", pets);
};
module.exports = { v1_routes };
