const { upload } = require("./../config/multer");
const {
  addProduct,
  fileData,
  updateProduct,
} = require("../controller/cont_product");

const Router = require("express").Router();

Router.post("/add-product", upload.single("product_image"), addProduct);

module.exports = Router;
