const { upload } = require("./../config/multer");
const {
  addProduct,
  deleteProduct,
  viewProducts,
  updateProduct,
  singleProduct,
} = require("../controller/cont_product");

const Router = require("express").Router();

Router.post("/add-product", upload.single("product_image"), addProduct);

Router.post("/view-products", viewProducts);

Router.post("/single-product", singleProduct);

Router.post("/delete-product", deleteProduct);

Router.post("/update-product", updateProduct);

module.exports = Router;
