const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const sequelize = require("sequelize");
const app = express();
const db = require("./models/index");
const { Op } = require("sequelize");

const test = db.admin;
const PORT = process.env.PORT;
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", userRoute);
app.use("/api/", cartRoute);
app.use("/api/", productRoute);
app.use("/api/", adminRoute);

app.use("/", async (req, res) => {
  const data = await test.findAll({});

  if (data) {
    console.log(data);
  } else {
    data;
  }

  res.send("Hello");
});

function sendToElasticAndLogToConsole(sql, queryObject) {
  // save the `sql` query in Elasticsearch
  console.log(sql);

  // use the queryObject if needed (e.g. for debugging)
}
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
