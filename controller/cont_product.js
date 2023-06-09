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
  const { prod_id } = req.body;
  const getProduct = await Product.findOne({ where: { prod_id } });
  const data = getProduct.toJSON();
  sendResponse({ res, data });
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  // const { prod_id } = req.body;
  // await Product.update({ where: { prod_id } });
  // sendResponse({ res });
};

const deleteProduct = async (req, res) => {
  const { prod_id } = req.body;
  await Product.destroy({ where: { prod_id } });
  sendResponse({ res });
};
const addProduct = async (req, res) => {
  const { product_desc, product_price, product_title, product_category } =
    req.body;
  const prod_image = req.file.filename;
  try {
    await Product.create({
      prod_title: product_title,
      prod_desc: product_desc,
      prod_image: "/upload/" + prod_image,
      prod_category: product_category,
      prod_price: product_price,
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
