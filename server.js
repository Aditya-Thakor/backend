const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const Router = require("./routes/userRoute");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", Router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
