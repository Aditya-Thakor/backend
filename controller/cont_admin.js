const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { sendResponse } = require("../service/response");
const { Op } = require("sequelize");

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
  const { data } = req.body;

  let emailData;
  if (data.id) {
    emailData = await Admin.findOne({
      where: { admin_email: data.admin_email, id: { [Op.ne]: data.id } },
      attributes: ["admin_email"],
    });
  } else {
    emailData = await Admin.findOne({
      where: { admin_email: data.admin_email },
      attributes: ["admin_email"],
    });
  }

  !emailData ? res.json({ valid: true }) : res.json({ valid: false });
};

const addAdmin = async (req, res) => {
  const { username, email, password, roles } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  await Admin.create({
    admin_name: username,
    admin_email: email,
    admin_password: hashPass,
    admin_roles: roles.toString(),
  });
  sendResponse({ res });
};

const singleAdmin = async (req, res) => {
  const { id } = req.body;
  const getAdmin = await Admin.findOne({ where: { id } });
  const data = getAdmin.toJSON();
  sendResponse({ res, data: { ...data, admin_password: "" } });
};

const deleteAdmin = async (req, res) => {
  const { id } = req.body;

  console.log("here", id);
  await Admin.destroy({ where: { id } });
  sendResponse({ res });
};

const updateAdmin = async (req, res) => {
  const { username, email, roles, id, original_email } = req.body;
  console.log(req.body);

  try {
    await Admin.update(
      {
        admin_name: username,
        admin_email: email,
        admin_roles: roles,
        updatedAt: new Date(),
      },
      { where: { id } }
    );
    sendResponse({ res });
  } catch (error) {
    console.log("Error while update Admin");
  }
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
  singleAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
};
