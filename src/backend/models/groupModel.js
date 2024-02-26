const mongoose = require("mongoose");
const groupUtils = require("./../utils/groups");

const schema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 30 },
  tasks: [{ type: mongoose.Schema.ObjectId, ref: "task" }],
  files: [String],
});

schema.pre(
  ["deleteOne", "deleteMany"],
  { document: false, query: true },
  async function (next) {
    const gps = await this.model.find(this.getFilter());
    console.log(gps);
    if (Array.isArray(gps)) {
      for (let i = 0; i < gps.length; ++i) {
        groupUtils.cascadeGroupDeletion(gps[i]);
      }
    } else {
      groupUtils.cascadeGroupDeletion(gps);
    }
    next();
  }
);

module.exports = mongoose.model("group", schema);
