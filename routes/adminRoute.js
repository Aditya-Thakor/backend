const {
  validAdmin,
  emailAdmin,
  addAdmin,
  showAdmin,
  singleAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/cont_admin");

const Router = require("express").Router();

Router.post("/add-admin", addAdmin);

Router.post("/validate-admin", validAdmin);

Router.post("/email-admin", emailAdmin);

Router.get("/show-admin", showAdmin);

Router.post("/single-admin", singleAdmin);

Router.post("/update-admin", updateAdmin);

Router.post("/delete-admin", deleteAdmin);

module.exports = Router;
