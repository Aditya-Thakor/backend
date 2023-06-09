const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendResponse } = require("../service/response");

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const Admin = db.admin;

const showAdmin = async (req, res) => {
  const adminData = await Admin.findAll();
  const data = [];
  adminData.map((_, i) => data.push(adminData[i].toJSON()));
  sendResponse({ res, data });
};

const emailAdmin = async (req, res) => {
  const { email } = req.body;

  const data = await Admin.findOne({
    where: { admin_email: email },
    attributes: ["admin_email"],
  });
  !data ? res.json({ valid: true }) : res.json({ valid: false });
};

const addAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  await Admin.create({
    admin_name: username,
    admin_email: email,
    admin_password: hashPass,
  });
  res.json({ status: 200, valid: true });
};

const validAdmin = async (req, res) => {
  const { email, password } = req.body;

  const getPass = await Admin.findOne({
    attributes: ["admin_password"],
    where: { admin_email: email },
  });

  if (getPass) {
    if (Object.keys(getPass.toJSON()).length > 0) {
      const hashPass = getPass.toJSON().password;
      const isValid = bcrypt.compare(password, hashPass);
      if (isValid) {
        const payload = { id: 1 };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 1024 * 1024 });
        const data = { token, role: "admin" };
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
  validAdmin,
  emailAdmin,
  showAdmin,
  addAdmin,
};
