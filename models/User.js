const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const user = mongoose.model("user", schema);
module.exports = user;
