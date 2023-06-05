const { raw } = require("express");
const db = require("../models/index");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const Cart = db.cart;

const addCart = async (req, res) => {};

const showCart = async (req, res) => {
  const products = await Cart.findAll({
    where: {
      user_id: 1,
    },
    raw: true,
  });

  res.json({ status: 200, valid: true, data: products[0] });
};

module.exports = { addCart, showCart };
