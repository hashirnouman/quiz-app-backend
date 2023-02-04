const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  title: { type: String, require: true },

  options: [
    {
      text: String,
      isTrue: Boolean,
    },
  ],
});

const quizes = mongoose.model("quizes", schema);
module.exports = quizes;
