const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const User = db.user;

const validateEmail = async (req, res) => {
  const { email } = req.body;

  console.log(email);
  const data = await User.findOne({ where: { email }, attributes: ["email"] });
  !data ? res.json({ valid: true }) : res.json({ valid: false });
};

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  await User.create({ name: username, email, password: hashPass });
  res.json({ status: 200 });
};

const validateUser = async (req, res) => {
  const { email, password } = req.body;

  const getPass = await User.findOne({
    attributes: ["password"],
    where: { email },
  });

  if (getPass) {
    if (Object.keys(getPass.toJSON()).length > 0) {
      const hashPass = getPass.toJSON().password;
      const isValid = bcrypt.compare(password, hashPass);

      if (isValid) {
        const payload = { id: 1 };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 1024 * 1024 });
        const data = { token, role: "user" };
        res.json({ status: 200, valid: true, data });
      } else {
        res.json({ status: 200, valid: false });
      }
    }
  } else {
    res.json({ status: 200, valid: false });
  }
};

module.exports = {
  validateEmail,
  validateUser,
  addUser,
};
