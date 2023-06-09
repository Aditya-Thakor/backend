const db = require("../models/index");
const Cart = db.cart;

const addCart = async (req, res) => {
  // const re = await Cart.create({ where: { cart_id: res.body.cart } });
  res.json({ status: 200, valid: true, data: [] });
};

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
