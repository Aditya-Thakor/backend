const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendResponse } = require("../service/response");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const User = db.user;

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  await User.create({ name: username, email, password: hashPass });
  sendResponse({ res });
};

const validateEmail = async (req, res) => {
  const { email } = req.body;

  const data = await User.findOne({ where: { email }, attributes: ["email"] });
  !data ? sendResponse({ res }) : sendResponse({ res, valid: false });
};

const validateUser = async (req, res) => {
  const { email, password } = req.body;

  const getPass = await User.findOne({
    attributes: ["user_id", "password", "role"],
    where: { email },
  });
  const { role, user_id } = getPass.toJSON();

  if (getPass) {
    if (Object.keys(getPass.toJSON()).length > 0) {
      const hashPass = getPass.toJSON().password;
      const isValid = await bcrypt.compare(password, hashPass);
      if (isValid) {
        const payload = { user_id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 1024 * 1024 });
        const data = { token, role };
        sendResponse({ res, data });
        return;
      } else {
        sendResponse({ res, valid: false });
        return;
      }
    }
  }
  sendResponse({ res, valid: false });
};

module.exports = {
  validateEmail,
  validateUser,
  addUser,
};
