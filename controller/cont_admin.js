const bcrypt = require("bcryptjs");
const db = require("../models/index");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const Admin = db.Admin;

const validateUser = async (req, res) => {
  const { email, password } = req.body;

  const getPass = await Admin.findOne({
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
        res.json({ status: 200, valid: true, token });
      } else {
        res.json({ status: 200, valid: false });
      }
    }
  } else {
    res.json({ status: 200, valid: false });
  }
};

module.exports = {
  validateUser,
};
