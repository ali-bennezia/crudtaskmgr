const mongoose = require("mongoose");
const taskModel = require("./taskModel.js");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  files: [String],
});

schema.pre("remove", function (next) {
  taskModel.remove({ group: this._id }).exec();
  next();
});

module.exports = mongoose.model("group", schema);
