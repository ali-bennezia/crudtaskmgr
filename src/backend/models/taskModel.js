const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "group",
    },
    title: { type: String, required: true, minlength: 3, maxlength: 28 },
    content: { type: String, required: true, minlength: 3, maxlength: 380 },
    groupIndex: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", schema);
