const mongoose = require("mongoose");
const taskUtils = require("./../utils/tasks");

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

schema.pre("save", async function (next) {
  if (this.isModified("group")) {
    let oldParent = await groupModel.findOne({
      _id: { $not: this.group },
      tasks: this._id,
    });
    let newParent = await groupModel.findOne({ _id: this.group });

    if (oldParent) {
      oldParent.tasks.splice(oldParent.tasks.indexOf(this._id), 1);
      await oldParent.save();
    }
    if (newParent) {
      newParent.tasks.push(this._id);
      await newParent.save();
    }
  }
  next();
});

schema.pre(
  ["deleteOne", "deleteMany"],
  { document: false, query: true },
  async function (next) {
    //await taskUtils.cascadeTaskDeletion(taskModel, this.getFilter().group);
    next();
  }
);

var taskModel = (module.exports = mongoose.model("task", schema));
