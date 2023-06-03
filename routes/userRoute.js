const {
  addUser,
  validateEmail,
  validateUser,
} = require("../controller/cont_user");

const Router = require("express").Router();

Router.post("/add-user", addUser);

Router.post("/validate-user", validateUser);

Router.post("/validate-email", validateEmail);

module.exports = Router;
