const { addCart, showCart } = require("../controller/cont_cart");

const Router = require("express").Router();

Router.post("/add-to-cart", addCart);

Router.get("/show-cart", showCart);

module.exports = Router;
