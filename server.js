const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");

const app = express();

const PORT = process.env.PORT;
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", userRoute);
app.use("/api/", cartRoute);
app.use("/api/", productRoute);

app.listen(PORT, () => console.log(`http://192.168.10.58:${PORT}`));
