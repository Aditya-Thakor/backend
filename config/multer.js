var multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "/home/aditya-thakor/Desktop/tasks/shopping/backend/public/upload"
    );
  },
  filename: (req, file, cb) => {
    console.log("file", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
