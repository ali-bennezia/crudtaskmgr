const mongoose = require("mongoose");
const fileUtils = require("./../utils/files.js");

const schema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: {
    enum: ["image", "video", "archive", "text", "other"],
  },
  group: { type: mongoose.Schema.ObjectId, ref: "group", required: true },
});

schema.pre(
  ["deleteOne", "deleteMany"],
  { document: false, query: true },
  async function (next) {
    const files = await this.model.find(this.getFilter());
    if (Array.isArray(files)) {
      for (let i = 0; i < files.length; ++i) {
        fileUtils.cascadeFileDeletion(files[i]);
      }
    } else {
      fileUtils.cascadeFileDeletion(files);
    }
    next();
  }
);

module.exports = mongoose.model("file", schema);
