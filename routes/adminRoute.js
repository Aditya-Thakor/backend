const {
  validAdmin,
  emailAdmin,
  addAdmin,
  showAdmin,
} = require("../controller/cont_admin");

const Router = require("express").Router();

Router.post("/add-admin", addAdmin);

Router.post("/validate-admin", validAdmin);

Router.post("/email-admin", emailAdmin);

Router.get("/show-admin", showAdmin);

module.exports = Router;
