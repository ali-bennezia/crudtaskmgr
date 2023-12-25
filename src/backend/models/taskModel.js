const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: { type: String, required: true, minlength: 3, maxlength: 28 },
    content: { type: String, required: true, minlength: 3, maxlength: 60 },
    description: {
      type: String,
      required: false,
      maxlength: 380,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", schema);
