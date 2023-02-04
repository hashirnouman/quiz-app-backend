const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", route);
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected");
    app.listen(4000);
  })
  .catch((err) => console.log(err));
