const db = require("../models/index");
const Product = db.products;
const dotenv = require("dotenv");
const { sendResponse } = require("../service/response");
dotenv.config();

const viewProducts = async (req, res) => {
  const getProduct = await Product.findAll();
  const arr = [];
  getProduct.map((_, i) => arr.push(getProduct[i].toJSON()));
  sendResponse({ res, data: arr });
};

const singleProduct = async (req, res) => {
  const { prod_id } = req.params;
  try {
    const getProduct = await Product.findOne({ where: { prod_id: +prod_id } });
    if (getProduct) {
      const data = getProduct.toJSON();
      sendResponse({ res, data });
    } else {
      sendResponse({ res, valid: false });
    }
  } catch (error) {
    sendResponse({ res, valid: false });
  }
};

const updateProduct = async (req, res) => {
  const { prod_desc, prod_price, prod_title, prod_category, prod_id } =
    req.body;
  const prod_image = req.file.filename;
  console.log(req.file.filename);
  try {
    await Product.update(
      {
        prod_title,
        prod_desc,
        prod_image: "/upload/" + prod_image,
        prod_category,
        prod_price,
        prod_img_name: req.file.originalname,
        updatedAt: new Date(),
      },
      { where: { prod_id } }
    );
    sendResponse({ res });
  } catch (error) {
    sendResponse({ res, valid: false });
  }
};

const deleteProduct = async (req, res) => {
  const { prod_id } = req.body;
  await Product.destroy({ where: { prod_id } });
  sendResponse({ res });
};
const addProduct = async (req, res) => {
  const { prod_desc, prod_price, prod_title, prod_category } = req.body;
  const prod_image = req.file.filename;
  try {
    await Product.create({
      prod_title,
      prod_desc,
      prod_image: "/upload/" + prod_image,
      prod_category,
      prod_price,
      prod_img_name: req.file.originalname,
    });
    sendResponse({ res });
  } catch (error) {
    sendResponse({ res, valid: false });
  }
};

module.exports = {
  addProduct,
  viewProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
