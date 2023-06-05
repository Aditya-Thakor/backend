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

  await Product.create({
    prod_title: product_title,
    prod_desc: product_desc,
    prod_image,
    prod_category,
  });
};

const updateProduct = (req, res) => {
  const { data } = req.body;
};

module.exports = {
  addProduct,
  updateProduct,
};
