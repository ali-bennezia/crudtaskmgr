const mongoose = require("mongoose");
const fileUtils = require("./../utils/files.js");

const schema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: {
    enum: ["image", "video", "archive", "text", "other"],
  },
});

schema.pre("remove", async function (next) {
  // TODO propagate file deletions to task group files arrays
  fileUtils.removeLocalFile(this.url);
});

module.exports = mongoose.model("file", schema);
