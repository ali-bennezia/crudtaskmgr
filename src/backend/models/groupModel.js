const mongoose = require("mongoose");
const taskModel = require("./taskModel.js");
const fileModel = require("./fileModel.js");

const schema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 30 },
  tasks: [{ type: mongoose.Schema.ObjectId, ref: "task" }],
  files: [String],
});

schema.pre("remove", function (next) {
  taskModel.remove({ group: this._id }).exec();
  this.files.array.forEach((f) => {
    fileModel.removeOne({ url: f });
  });
  next();
});

module.exports = mongoose.model("group", schema);
