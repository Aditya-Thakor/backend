const {
  validAdmin,
  emailAdmin,
  addAdmin,
} = require("../controller/cont_admin");

const Router = require("express").Router();

Router.post("/add-admin", addAdmin);

Router.post("/validate-admin", validAdmin);

Router.post("/email-admin", emailAdmin);

module.exports = Router;
