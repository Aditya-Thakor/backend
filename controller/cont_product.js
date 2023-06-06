const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const Product = db.products;

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

    res.json({ status: 200, valid: true });
  } catch (error) {
    console.log(error);
    res.json({ status: 200, valid: false });
  }
};

const viewProducts = async (req, res) => {
  const getProduct = await Product.findAll();
  const arr = [];
  getProduct.map((_, i) => arr.push(getProduct[i].toJSON()));
  res.json({ data: arr, status: 200, valid: true });
};

const updateProduct = async (req, res) => {
  await Product.update({ newData: {} }, { where: { prod_id: 1 } });
};

const singleProduct = async (req, res) => {
  const { prod_id } = req.body;
  const getProduct = await Product.findOne({ where: { prod_id } });
  const data = getProduct.toJSON();

  res.json({ data, status: 200, valid: true });
};

const deleteProduct = async (req, res) => {
  await Product.destroy({ where: { prod_id: 1 } });
};
module.exports = {
  addProduct,
  viewProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
