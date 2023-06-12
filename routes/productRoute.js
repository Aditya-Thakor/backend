const { upload } = require("./../config/multer");
const {
  addProduct,
  deleteProduct,
  viewProducts,
  updateProduct,
  singleProduct,
} = require("../controller/cont_product");

const Router = require("express").Router();

Router.post("/add-product", upload.single("prod_image"), addProduct);

Router.post("/view-products", viewProducts);

Router.get("/single-product/:prod_id", singleProduct);

Router.post("/delete-product", deleteProduct);

Router.put("/update-product", upload.single("prod_image"), updateProduct);

module.exports = Router;
