const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: {
    enum: ["image", "video", "archive", "text", "other"],
  },
});

mongoose.exports = mongoose.model("file", schema);
